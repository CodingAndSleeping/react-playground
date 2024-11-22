import { useContext } from 'react'
import { EditorProps } from '@monaco-editor/react'
import { debounce } from 'lodash-es'
import Editor from './editor'
import FileNameList from './fileNameList'
import { PlaygroundContext } from '../../playgroundContext'

function CodeEditor() {
  const { files, theme, setFiles, selectedFileName } =
    useContext(PlaygroundContext)

  const file = files[selectedFileName]

  const onEditorChange: EditorProps['onChange'] = value => {
    files[selectedFileName].value = value || ''
    setFiles({ ...files })
  }

  return (
    <div className='h-full flex flex-col'>
      <FileNameList></FileNameList>
      <Editor
        file={file}
        onChange={debounce(onEditorChange, 800)}
        options={{
          theme: `vs-${theme}`,
        }}
      ></Editor>
    </div>
  )
}

export default CodeEditor
