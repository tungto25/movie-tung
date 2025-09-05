import { Children, createContext, useEffect, useState } from "react";

export const ContextAuth = createContext();
export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(null);

    useEffect(() => {
     const login = localStorage.getItem("isLogin");
     if(login) {
         setIsLogin(JSON.parse(login));
     }
    },[])
    const handleLogin = (account) => {
        localStorage.setItem("isLogin", JSON.stringify(account));
        setIsLogin(account);
    }
    const handleLogout = () => {
         localStorage.removeItem("isLogin");
         setIsLogin(null);
    }

    return (
        <ContextAuth.Provider value={{ isLogin , handleLogin ,handleLogout }} >
            {children}
        </ContextAuth.Provider>
    );
}

