import { useContext } from 'react'
import './App.css'
import HomeAdmin from './pages/admin/home_admin/HomeAdmin'
import Home from './pages/client/home/Home'
import { ContextAuth } from './contexts/AuthProvider';
function App() {
  const { isLogin } = useContext(ContextAuth);
  return (
    <div>
      {isLogin?.roles === "admin" ? <HomeAdmin /> : <Home />}
    </div>

  )
}

export default App;
