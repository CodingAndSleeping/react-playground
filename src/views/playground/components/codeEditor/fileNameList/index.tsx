import { useContext, useEffect, useRef, useState } from 'react'
import { PlaygroundContext } from '@/views/playground/playgroundContext'
import FileNameItem from './fileNameItem'
import cn from 'classnames'
import styles from '../index.module.scss'
import {
  APP_COMPONENT_FILE_NAME,
  ENTRY_FILE_NAME,
  IMPORT_MAP_FILE_NAME,
} from '@/views/playground/files'
function FileNameList() {
  const {
    files,
    addFile,
    updateFileName,
    removeFile,
    selectedFileName,
    setSelectedFileName,
  } = useContext(PlaygroundContext)

  const [tabs, setTabs] = useState([''])

  const ref = useRef<HTMLDivElement>(null)

  const readonltFiles = [
    ENTRY_FILE_NAME,
    IMPORT_MAP_FILE_NAME,
    APP_COMPONENT_FILE_NAME,
  ]

  useEffect(() => {
    setTabs(Object.keys(files))

    ref.current?.addEventListener('wheel', e => {
      e.preventDefault()
      ref.current!.scrollLeft += e.deltaY
    })
  }, [files])

  const handleEditComplete = (oldName: string, newName: string) => {
    updateFileName(oldName, newName)
    setSelectedFileName(newName)
  }

  const [creating, setCreating] = useState(false)

  const handleAddFile = () => {
    const newFileName = 'Comp' + Math.random().toString().slice(2, 8) + '.tsx'
    addFile(newFileName)
    setCreating(true)
    setSelectedFileName(newFileName)
  }

  const handelRemoveFile = (e: React.MouseEvent, name: string) => {
    e.stopPropagation()

    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      removeFile(name)
    }
  }

  return (
    <div
      className={cn(
        styles.tab,
        'h-[2.5rem] px-[0.5rem] overflow-x-auto overflow-y-hidden border-b-[1px] border-gray-[#ddd] text-[var(--text)] bg-[var(--bg-color)] flex items-center'
      )}
      ref={ref}
    >
      {tabs.map((fileName, index) => (
        <FileNameItem
          key={fileName}
          value={fileName}
          actived={selectedFileName === fileName}
          creating={creating && index === tabs.length - 1}
          readonly={readonltFiles.includes(fileName)}
          onEditComplete={(name: string) => handleEditComplete(fileName, name)}
          onClick={() => setSelectedFileName(fileName)}
          onRemove={e => handelRemoveFile(e, fileName)}
        ></FileNameItem>
      ))}

      <div
        className='text-[17px] text-[#8f8f8f] cursor-pointer hover:text-[#0ad8ff]'
        onClick={handleAddFile}
      >
        +
      </div>
    </div>
  )
}

export default FileNameList
