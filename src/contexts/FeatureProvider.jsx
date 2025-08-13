import { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/FirebaseService';

export const ContextFeatures = createContext([]);
export const FeatureProvider = ({ children }) => {
    const [features, setFeatures] = useState([]);
    useEffect(() => {
        const unsubcribe = fetchDocumentsRealtime("Features", (featureList) => {
            setFeatures(featureList);
        });
        return () => unsubcribe();
    }, []);
    return (
        <ContextFeatures.Provider value={features}>
            {children}
        </ContextFeatures.Provider>
    )
}