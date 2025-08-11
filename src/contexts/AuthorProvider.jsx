import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/FirebaseService";

export const ContextAuthors = createContext([]);

export const AuthorProvider = ({ children }) => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
        const unsubscribe = fetchDocumentsRealtime("Authors", (authorsslist) => {
            setAuthors(authorsslist);
        });

        // Hủy lắng nghe khi component bị unmount
        return () => unsubscribe();
    }, []);

    return (
        <ContextAuthors.Provider value={authors}>
            {children}
        </ContextAuthors.Provider>
    );
};