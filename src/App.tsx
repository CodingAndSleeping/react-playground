import ReactPlayground from './views/playground'
import { PlaygroundProvider } from './views/playground/playgroundContext'

import './App.scss'

function App() {
  return (
    <PlaygroundProvider>
      <ReactPlayground></ReactPlayground>
    </PlaygroundProvider>
  )
}

export default App
