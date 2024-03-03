import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RequisitosCurso from './components/RequisitosCurso.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <RequisitosCurso />
  )
}

export default App
