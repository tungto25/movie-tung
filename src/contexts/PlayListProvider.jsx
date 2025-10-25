import { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/FirebaseService';

export const ContextPlayLists = createContext([]);
export const PlayListProvider = ({ children }) => {
    const [playLists, setPlayLists] = useState([]);
    useEffect(() => {
        const unsubscribe = fetchDocumentsRealtime("PlayLists", (playLists) => {
            setPlayLists(playLists);
        });
        return () => unsubscribe();
    }, []);
    return (
        <ContextPlayLists.Provider value={playLists}>
            {children}
        </ContextPlayLists.Provider>
    )
}