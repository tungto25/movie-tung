import { useState } from 'react'
import './App.css'
import HomeRouters from './routers/HomeRouters'
import MenuAdmin from './components/admin/MenuAdmin'
import HeaderAdmin from './components/admin/HeaderAdmin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col md:flex-row min-h-max'>
      <MenuAdmin />
      <div className="flex-1 p-3 bg-gray-600 text-white min-h-max">
        <HeaderAdmin />
        <HomeRouters />
      </div>
    </div>
  )
}

export default App
