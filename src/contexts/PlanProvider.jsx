import { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/FirebaseService';

export const ContextPlans = createContext([]);
export const PlanProvider = ({ children }) => {
    const [plans, setPlans] = useState([]);
    useEffect(() => {
        const unsubscribe = fetchDocumentsRealtime("Plans", (planList) => {
            setPlans(planList);
        });
        return () => unsubscribe();
    }, []);
    return (
        <ContextPlans.Provider value={plans}>
            {children}
        </ContextPlans.Provider>
    )
}