import { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/FirebaseService';

export const ContextPlayListMovies = createContext([]);
export const PlayListMoviesProvider = ({ children }) => {
    const [playListMovies, setPlayListMovies] = useState([]);
    useEffect(() => {
        const unsubscribe = fetchDocumentsRealtime("PlayListMovies", (playLists) => {
            setPlayListMovies(playLists);
        });
        return () => unsubscribe();
    }, []);
    console.log(playListMovies);
    
    return (
        <ContextPlayListMovies.Provider value={playListMovies}>
            {children}
        </ContextPlayListMovies.Provider>
    )
}