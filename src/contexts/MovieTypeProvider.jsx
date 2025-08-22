import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/FirebaseService";

export const ContextMovieTypes = createContext([]);

export const MovieTypeProvider = ({ children }) => {
    const [movietypes, setMovieTypes] = useState([]);

    useEffect(() => {
        // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
        const unsubscribe = fetchDocumentsRealtime("MovieTypes", (movietypelist) => {
            setMovieTypes(movietypelist);
        });

        // Hủy lắng nghe khi component bị unmount
        return () => unsubscribe();
    }, []);

    return (
        <ContextMovieTypes.Provider value={movietypes}>
            {children}
        </ContextMovieTypes.Provider>
    );
};