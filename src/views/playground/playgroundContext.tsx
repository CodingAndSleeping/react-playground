import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { compress, fileName2Language, uncompress } from './utils'
import { initFiles } from './files'
export interface File {
  name: string
  language: string
  value: string
}

export interface Files {
  [key: string]: File
}

export type Theme = 'light' | 'dark'
export interface PlaygroundContext {
  files: Files
  selectedFileName: string

  theme: Theme
  setTheme: (theme: Theme) => void

  setSelectedFileName: (name: string) => void
  setFiles: (files: Files) => void
  addFile: (name: string) => void
  removeFile: (name: string) => void
  updateFileName: (oldName: string, newName: string) => void
}

// Context
export const PlaygroundContext = createContext<PlaygroundContext>({
  files: {},
  selectedFileName: '',
} as PlaygroundContext)

function getFilesFromUrl() {
  let fils: Files | undefined
  try {
    const fileObj = uncompress(window.location.hash.slice(1))
    if (fileObj) fils = JSON.parse(fileObj)
  } catch (e) {
    console.error(e)
  }
  return fils
}

// Provider
export function PlaygroundProvider({ children }: PropsWithChildren) {
  const [files, setFiles] = useState<Files>(getFilesFromUrl() || initFiles)

  const [selectedFileName, setSelectedFileName] = useState<string>('App.tsx')

  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const hash = compress(JSON.stringify(files))
    window.location.hash = hash || ''
  }, [files])

  const addFile = (name: string) => {
    files[name] = {
      name,
      language: fileName2Language(name),
      value: '',
    }
    setFiles({ ...files })
  }

  const removeFile = (name: string) => {
    delete files[name]
    const keys = Object.keys(files)
    const newSelectedFileName = keys[keys.length - 1]
    setSelectedFileName(newSelectedFileName)
    setFiles({ ...files })
  }

  const updateFileName = (oldName: string, newName: string) => {
    if (!files[oldName] || newName === undefined || newName === null) return

    const entries = Object.entries(files)
    const modifiedEntries = entries.map(([key, value]) =>
      key === oldName ? [newName, value] : [key, value]
    )

    const newFiles = Object.fromEntries(modifiedEntries)

    setFiles({ ...newFiles })
  }

  return (
    <PlaygroundContext.Provider
      value={{
        files,
        selectedFileName,
        theme,
        setTheme,
        setSelectedFileName,
        setFiles,
        addFile,
        removeFile,
        updateFileName,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  )
}
