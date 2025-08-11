import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/FirebaseService";

export const ContextActors = createContext([]);

export const ActorProvider = ({ children }) => {
    const [actors, setActors] = useState([]);

    useEffect(() => {
        // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
        const unsubscribe = fetchDocumentsRealtime("Actors", (actorlist) => {
            setActors(actorlist);
        });

        // Hủy lắng nghe khi component bị unmount
        return () => unsubscribe();
    }, []);

    return (
        <ContextActors.Provider value={actors}>
            {children}
        </ContextActors.Provider>
    );
};