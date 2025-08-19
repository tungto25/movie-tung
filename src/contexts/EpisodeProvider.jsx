import { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/FirebaseService';

export const ContextEpisodes = createContext([]);
export const EpisodeProvider = ({ children }) => {
    const [episodes, setEpisodes] = useState([]);
    useEffect(() => {
        const unsubcribe = fetchDocumentsRealtime("Episodes", (episodeList) => {
            setEpisodes(episodeList);
        });
        return () => unsubcribe();
    }, []);
    return (
        <ContextEpisodes.Provider value={episodes}>
            {children}
        </ContextEpisodes.Provider>
    )
}