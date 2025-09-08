import { useContext } from 'react'
import './App.css'
import HomeAdmin from './pages/admin/home_admin/HomeAdmin'
import Home from './pages/client/home/Home'
import { AccountProvider } from './contexts/AccountProvider'
function App() {
  const accounts = useContext(AccountProvider);

  return (
    //  <HomeAdmin />
    <Home />
  )
}

export default App
