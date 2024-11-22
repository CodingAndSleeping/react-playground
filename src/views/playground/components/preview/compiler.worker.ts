import { transform } from '@babel/standalone'
import { ENTRY_FILE_NAME } from '../../files'
import type { Files, File } from '../../playgroundContext'
import { PluginObj } from '@babel/core'

// babel编译器
export function babelTransform(
  code: string,
  fileName: string,
  files: Files
): string {
  let _code = code
  const regexReact = /import\s+React/g
  if (
    (fileName.endsWith('.jsx') || fileName.endsWith('.tsx')) &&
    !regexReact.test(code)
  ) {
    _code = `import React from'react';\n${code}`
  }

  let result = ''

  try {
    const res = transform(_code, {
      presets: ['react', 'typescript'],
      filename: fileName,
      plugins: [customResolver(files)],
      retainLines: true,
    })

    result = res.code!
  } catch (e) {
    console.log('编译失败', e)
  }

  return result
}

// 自定义babel插件，用于解析文件依赖 替换为 url
function customResolver(files: Files): PluginObj {
  return {
    visitor: {
      ImportDeclaration(path) {
        const modulePath = path.node.source.value
        if (modulePath.startsWith('.')) {
          const file = getModuleFileFullName(files, modulePath)
          if (!file) return

          if (file.name.endsWith('.json')) {
            path.node.source.value = json2Js(file)
          } else if (file.name.endsWith('.css')) {
            path.node.source.value = css2Js(file)
          } else {
            path.node.source.value = URL.createObjectURL(
              new Blob([babelTransform(file.value, file.name, files)], {
                type: 'application/javascript',
              })
            )
          }
        }
      },
    },
  }
}

// 根据省略后缀的路径得到完整的路径对应的文件 例如 ./App  => ./App.ts
function getModuleFileFullName(files: Files, modulePath: string): File {
  let moduleName = modulePath.split('./').pop() || ''
  if (!moduleName.includes('.')) {
    // 过滤出来 ts js tsx jsx 文件
    const fileNames = Object.keys(files).filter(item => {
      return (
        item.endsWith('.ts') ||
        item.endsWith('.tsx') ||
        item.endsWith('.js') ||
        item.endsWith('.jsx')
      )
    })

    const fullModuleName = fileNames.find(item => {
      return item.split('.').includes(moduleName)
    })

    if (fullModuleName) moduleName = fullModuleName
  }

  return files[moduleName]
}

function json2Js(file: File): string {
  const js = `export default ${file.value}`
  return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))
}

function css2Js(file: File): string {
  const randomId = new Date().getTime()

  const js = `
    (() => {
      const stylesheet = document.createElement('style')
      stylesheet.setAttribute('id', 'style_${randomId}_${file.name}')
      document.head.appendChild(stylesheet)

      const styles = document.createTextNode(${JSON.stringify(file.value)})
      stylesheet.innerHTML = ''
      stylesheet.appendChild(styles)
    })()
  `

  return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))
}

export function compile(files: Files) {
  const main = files[ENTRY_FILE_NAME]

  return babelTransform(main.value, main.name, files)
}

self.addEventListener('message', async ({ data }) => {
  const files = data

  try {
    self.postMessage({
      type: 'COMPILE_CODE',
      data: compile(files),
    })
  } catch (e) {
    self.postMessage({
      type: 'ERROR',
      data: e,
    })
  }
})
