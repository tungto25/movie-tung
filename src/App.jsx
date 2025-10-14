import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomeAdmin from './pages/admin/home_admin/HomeAdmin';
import Home from './pages/client/home/Home';
import { ContextAuth } from './contexts/AuthProvider';

function App() {
  const { isLogin } = useContext(ContextAuth);

  return (
    <Routes>
      {/* Nếu là admin thì load trang admin */}
      {isLogin?.roles !== "admin" ? (
        <Route path="/*" element={<HomeAdmin />} />
      ) : (
        <>
          {/* Nếu không phải admin thì ép về Main khi vào "/" */}
          <Route path="/*" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
}

export default App;
