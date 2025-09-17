import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/FirebaseService";

export const ContextAccount = createContext([]);

export const AccountProvider = ({ children }) => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
        const unsubscribe = fetchDocumentsRealtime("Accounts", (accountlist) => {
            setAccounts(accountlist);
        });

        // Hủy lắng nghe khi component bị unmount
        return () => unsubscribe();
    }, []);
  
    return (
        <ContextAccount.Provider value={accounts}>
            {children}
        </ContextAccount.Provider>
    );
};