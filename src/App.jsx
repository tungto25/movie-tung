import { useContext } from 'react'
import './App.css'
import HomeAdmin from './pages/admin/home_admin/HomeAdmin'
import Home from './pages/client/home/Home'
import { ContextAccount } from './contexts/AccountProvider';
import { ContextAuth } from './contexts/AuthProvider';
function App() {
  const { isLogin } = useContext(ContextAuth);
  console.log(isLogin);
  const section = isLogin?.roles === "admin";
  return (
    <div>
      {section ? <HomeAdmin /> : <Home />}
    </div>

  )
}

export default App
