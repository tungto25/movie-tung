import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/FirebaseService";

export const ContextMovieTypes = createContext([]);

export const MovieTypeProvider = ({ children }) => {
    const [movieTypes, setMovieTypes] = useState([]);

    useEffect(() => {
        // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
        const unsubscribe = fetchDocumentsRealtime("MovieTypes", (movieTypeslist) => {
            setMovieTypes(movieTypeslist);
        });

        // Hủy lắng nghe khi component bị unmount
        return () => unsubscribe();
    }, []);

    return (
        <ContextMovieTypes.Provider value={movieTypes}>
            {children}
        </ContextMovieTypes.Provider>
    );
};