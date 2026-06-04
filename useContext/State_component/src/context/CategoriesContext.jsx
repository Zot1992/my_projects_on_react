import { createContext, useState, useEffect } from 'react';
import { arrayCategories } from '../../utisl/db'

export const CategoriesContext = createContext()

export function CategoriesProvider({ children }) {
    const [categories, setCategories] = useState(localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : arrayCategories);

    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(categories));
    }, [categories])

    return (
        <CategoriesContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoriesContext.Provider>
    )

}