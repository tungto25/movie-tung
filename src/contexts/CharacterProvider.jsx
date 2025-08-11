import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/FirebaseService";

export const ContextCharacters = createContext([]);

export const CharacterProvider = ({ children }) => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
        const unsubscribe = fetchDocumentsRealtime("Characters", (characterlist) => {
            setCharacters(characterlist);
        });

        // Hủy lắng nghe khi component bị unmount
        return () => unsubscribe();
    }, []);

    return (
        <ContextCharacters.Provider value={characters}>
            {children}
        </ContextCharacters.Provider>
    );
};