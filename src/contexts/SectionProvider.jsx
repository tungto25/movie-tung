import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/FirebaseService";

export const ContextSections = createContext([]);

export const SectionProvider = ({ children }) => {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
        const unsubscribe = fetchDocumentsRealtime("Sections", (sectionlist) => {
            setSections(sectionlist);
        });

        // Hủy lắng nghe khi component bị unmount
        return () => unsubscribe();
    }, []);

    return (
        <ContextSections.Provider value={sections}>
            {children}
        </ContextSections.Provider>
    );
};