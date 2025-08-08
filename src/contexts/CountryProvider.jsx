import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/FirebaseService";

export const ContextCountries = createContext([]);

export const CountryProvider = ({ children }) => {
    const [Countries, setCountries] = useState([]);

    useEffect(() => {
        // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
        const unsubscribe = fetchDocumentsRealtime("Countries", (Countrieslist) => {
            setCountries(Countrieslist);
        });

        // Hủy lắng nghe khi component bị unmount
        return () => unsubscribe();
    }, []);

    return (
        <ContextCountries.Provider value={Countries}>
            {children}
        </ContextCountries.Provider>
    );
};