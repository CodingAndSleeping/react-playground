import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import Header from './components/header'
import CodeEditor from './components/codeEditor'
import Preview from './components/preview'
import { useContext } from 'react'
import { PlaygroundContext } from './playgroundContext'

import './index.scss'
function ReactPlayground() {
  const { theme } = useContext(PlaygroundContext)

  return (
    <div className={theme} style={{ height: 'calc(100vh - 50px)' }}>
      <Header></Header>
      <Allotment>
        <Allotment.Pane minSize={500}>
          <CodeEditor></CodeEditor>
        </Allotment.Pane>
        <Allotment.Pane minSize={200}>
          <Preview></Preview>
        </Allotment.Pane>
      </Allotment>
    </div>
  )
}

export default ReactPlayground
