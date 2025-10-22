import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ContextAuth = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(null);
    const navigate = useNavigate(); // ✅ thêm dòng này

    useEffect(() => {
        const login = localStorage.getItem("isLogin");
        if (login) {
            setIsLogin(JSON.parse(login));
        }
    }, []);

    const handleLogin = (account) => {
        localStorage.setItem("isLogin", JSON.stringify(account));
        setIsLogin(account);
    };

    const handleLogout = () => {
        localStorage.removeItem("isLogin");
        setIsLogin(null);
        navigate("/"); // ✅ chuyển hướng về trang login
    };

    return (
        <ContextAuth.Provider value={{ isLogin, handleLogin, handleLogout }}>
            {children}
        </ContextAuth.Provider>
    );
};
