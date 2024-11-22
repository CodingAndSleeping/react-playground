import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import 'virtual:svg-icons-register'

createRoot(document.getElementById('root')!).render(<App />)
