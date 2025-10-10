import { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/FirebaseService';

export const ContextPlayList = createContext([]);
export const PlayListProvider = ({ children }) => {
    const [playLists, setPlayLists] = useState([]);
    useEffect(() => {
        const unsubscribe = fetchDocumentsRealtime("PlayLists", (playList) => {
            setPlayLists(playList);
        });
        return () => unsubscribe();
    }, []);
    return (
        <ContextPlayList.Provider value={playLists}>
            {children}
        </ContextPlayList.Provider>
    )
}