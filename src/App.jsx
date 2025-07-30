import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomeAdmin from './pages/admin/home_admin/HomeAdmin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HomeAdmin />
    </>
  )
}

export default App
