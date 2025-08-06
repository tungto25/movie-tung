import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const CategoryContext = createContext();
function CategoryProvider({ children }) {
    const [categories, setCategories] = useState([]);
    const [update, setUpdate] = useState(false);

    const handleUpdate = () => {
        setUpdate(!update)
    }
    useEffect(() => {
        getApi();
    }, [update]);

    const getApi = async () => {
        const reponse = await axios.get("https://6878a5b463f24f1fdc9ed6fb.mockapi.io/category");
        setCategories(reponse.data);
    }
    return (
        <CategoryContext.Provider value={{ categories, handleUpdate }}>{children}</CategoryContext.Provider>
    );
}

export default CategoryProvider;