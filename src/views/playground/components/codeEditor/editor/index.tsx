import MonacoEditor, { EditorProps as ep, OnMount } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import { createATA } from './ata'

export interface EditorFile {
  name: string
  value: string
  language: string
}

interface EditorProps {
  file: EditorFile
  onChange?: ep['onChange']
  options?: editor.IStandaloneEditorConstructionOptions
}

function Editor(props: EditorProps) {
  const { file, onChange, options } = props

  // editor 挂载时的回调函数
  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KeyL,
      () => {
        editor.getAction('editor.action.formatDocument')?.run()
      }
    )

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    })

    // 创建自动补全工具
    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      )
    })

    // 监听编辑器内容变化 触发自动补全
    editor.onDidChangeModelContent(() => {
      ata(editor.getValue())
    })

    // 首次渲染时触发自动补全
    ata(editor.getValue())
  }

  return (
    <MonacoEditor
      height='100%'
      path={file.name} // 编辑器文件名
      language={file.language} // 编辑器语言
      value={file.value} // 编辑器内容
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false, // 允许滚动到最后一行
        minimap: {
          enabled: false, // 禁用 minimap
        },
        scrollbar: {
          verticalScrollbarSize: 6, // 垂直滚动条大小
          horizontalScrollbarSize: 6, // 水平滚动条大小
        },

        ...options,
      }}
      onMount={handleEditorMount}
      onChange={onChange}
    ></MonacoEditor>
  )
}

export default Editor
