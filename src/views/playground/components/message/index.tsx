import { useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './index.module.scss'

export interface MessageProps {
  type: 'error' | 'warn'
  content: string
}

function Message(props: MessageProps) {
  const { type, content } = props

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(!!content)
  }, [content])

  return visible ? (
    <div className={cn(styles.message, styles[type])}>
      <pre
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      ></pre>

      <button className={styles.close} onClick={() => setVisible(false)}>
        ×
      </button>
    </div>
  ) : null
}

export default Message
