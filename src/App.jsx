import { useState } from 'react'
import './App.css'
import MenuAdmin from './components/admin/MenuAdmin'
import HeaderAdmin from './components/admin/HeaderAdmin'
import AdminRouters from './routers/AdminRouters'
import Background from "./components/admin/Background";
function App() {

  return (
    <div className='relative flex flex-col md:flex-row min-h-max'>
      <MenuAdmin />
      <Background className="absolute z-0 pointer-events-none" />
      <div className=" flex-1 p-3 bg-gray-900 text-white min-h-max">
        <HeaderAdmin />
        <AdminRouters />
      </div>
    </div>
  )
}

export default App
