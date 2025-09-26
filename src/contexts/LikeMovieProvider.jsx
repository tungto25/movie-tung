import { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/FirebaseService';

export const ContextLikeMovie = createContext([]);
export const LikeMovieProvider = ({ children }) => {
    const [likeMovies, setLikeMovies] = useState([]);
    useEffect(() => {
        const unsubcribe = fetchDocumentsRealtime("LikeMovies", (likeList) => {
            setLikeMovies(likeList);
        });
        return () => unsubcribe();
    }, []);
    return (
        <ContextLikeMovie.Provider value={likeMovies}>
            {children}
        </ContextLikeMovie.Provider>
    )
}