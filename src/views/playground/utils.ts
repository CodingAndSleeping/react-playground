import { strFromU8, strToU8, unzlibSync, zlibSync } from 'fflate'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { Files } from './playgroundContext'

/**
 *
 * @param fileName 文件名
 * @returns 语言类型
 */
export function fileName2Language(fileName: string): string {
  const suffix = fileName.split('.').pop() || ''

  if (['js', 'jsx'].includes(suffix)) return 'javascript'
  if (['ts', 'tsx'].includes(suffix)) return 'typescript'
  if (['json'].includes(suffix)) return 'json'
  if (['css'].includes(suffix)) return 'css'

  return 'javascript'
}

/**
 * 压缩字符串
 * @param data 原始数据
 * @returns
 */
export function compress(data: string) {
  if (!data) return
  const buffer = strToU8(data)
  const zipped = zlibSync(buffer, { level: 9 })
  const str = strFromU8(zipped, true)
  return btoa(str)
}

/**
 *  解压字符串
 * @param base64 压缩后的base64字符串
 * @returns
 */
export function uncompress(base64: string) {
  if (!base64) return
  const binary = atob(base64)

  const buffer = strToU8(binary, true)
  const unzipped = unzlibSync(buffer)
  return strFromU8(unzipped)
}

/**
 *  下载文件
 * @param files 文件
 * @returns
 */
export async function downloadFiles(files: Files) {
  const zip = new JSZip()

  Object.keys(files).forEach(name => {
    zip.file(name, files[name].value)
  })

  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, `code${Math.random().toString().slice(2, 8)}.zip`)
}
