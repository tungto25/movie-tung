import { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/FirebaseService';

export const ContextPackages = createContext([]);
export const PackageProvider = ({ children }) => {
    const [packages, setPackeges] = useState([]);
    useEffect(() => {
        const unsubcribe = fetchDocumentsRealtime("Packages", (pakageList) => {
            setPackeges(pakageList);
        });
        return () => unsubcribe();
    }, []);
    return (
        <ContextPackages.Provider value={packages}>
            {children}
        </ContextPackages.Provider>
    )
}