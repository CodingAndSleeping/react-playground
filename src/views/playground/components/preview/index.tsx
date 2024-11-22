import { useContext, useEffect, useRef, useState } from 'react'
import { PlaygroundContext } from '../../playgroundContext'
import Message from '../message/index'
// import { compile } from './compiler'
import ComplierWorker from './compiler.worker?worker'
import iframeRaw from './iframe.html?raw'
import { IMPORT_MAP_FILE_NAME } from '../../files'
function Preview() {
  const { files } = useContext(PlaygroundContext)

  const [compliedCode, setCompliedCode] = useState('')

  const compilerWorker = useRef<Worker | null>(null)

  useEffect(() => {
    if (!compilerWorker.current) {
      compilerWorker.current = new ComplierWorker()

      compilerWorker.current.addEventListener('message', ({ data }) => {
        if (data.type === 'COMPILE_CODE') {
          setCompliedCode(data.data)
        } else {
          console.log(data)
        }
      })
    }
    compilerWorker.current?.postMessage(files)

    setError('')
  }, [files])

  const getIframeUrl = () => {
    const res = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type='importmap'>${files[IMPORT_MAP_FILE_NAME].value}</script>`
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type='module' id='appSrc'>
          ${compliedCode}
        </script>`
      )
    return URL.createObjectURL(new Blob([res], { type: 'text/html' }))
  }

  const [error, setError] = useState('')

  const handleMessage = (e: MessageEvent) => {
    const { type, message } = e.data

    if (type === 'ERROR') {
      setError(message)
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <div style={{ height: 'calc(100% - 50px)' }}>
      <iframe src={getIframeUrl()} className='w-full h-full'></iframe>
      <Message type='error' content={error}></Message>
    </div>
  )
}

export default Preview
