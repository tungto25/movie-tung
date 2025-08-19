import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/FirebaseService";

export const ContextTrailers = createContext([]);

export const TrailerProvider = ({ children }) => {
    const [trailers, setTrailers] = useState([]);

    useEffect(() => {
        // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
        const unsubscribe = fetchDocumentsRealtime("Trailers", (trailerlist) => {
            setTrailers(trailerlist);
        });

        // Hủy lắng nghe khi component bị unmount
        return () => unsubscribe();
    }, []);

    return (
        <ContextTrailers.Provider value={trailers}>
            {children}
        </ContextTrailers.Provider>
    );
};