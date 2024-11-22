import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
export interface FileNameItemProps {
  value: string
  actived: boolean
  creating: boolean
  readonly?: boolean
  onEditComplete: (value: string) => void
  onClick: () => void

  onRemove: MouseEventHandler
}

function FileNameItem(props: FileNameItemProps) {
  const {
    value,
    actived = false,
    creating,
    readonly = false,
    onEditComplete,
    onClick,
    onRemove,
  } = props

  const [name, setName] = useState(value)

  const [editing, setEditing] = useState(creating)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleDoubleClick = () => {
    setEditing(true)
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus()
    }, 0)
  }

  const handleInputChange = () => {
    setName(inputRef.current?.value || '')
  }

  const handleInputBlur = () => {
    setEditing(false)
    onEditComplete(name)
  }

  useEffect(() => {
    if (creating) {
      if (inputRef.current) inputRef.current.focus()
    }
  }, [creating])

  return (
    <div
      className={cn(
        'h-full mr-[0.5rem] px-[0.5rem] text-sm  cursor-pointer border-b-[3px] flex items-center',
        actived ? 'border-b-[#0ad8ff] text-[#0ad8ff]' : 'border-b-transparent'
      )}
      onClick={onClick}
    >
      {editing ? (
        <input
          className='h-[1.5rem] w-[6rem] pl-[10px] text-[13px] bg-gray-100 outline-none'
          ref={inputRef}
          value={name}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      ) : (
        <div className='flex items-center'>
          <span
            className='text-nowrap'
            onDoubleClick={!readonly ? handleDoubleClick : () => {}}
          >
            {name}
          </span>

          {!readonly && (
            <div
              className='ml-[0.8rem] text-[13px] font-[200]  cursor-pointer'
              onClick={onRemove}
            >
              ×
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FileNameItem
