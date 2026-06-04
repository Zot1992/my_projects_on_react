import { useState, useContext } from 'react';
import styles from '../Editing/Editing.module.css'
import { CategoriesContext } from '../../context/CategoriesContext';

export default function Editing({ category, setIsEditing }) {

    const { categories, setCategories } = useContext(CategoriesContext);

    const [localValue, setLocalValue] = useState(category.name);

    const hundleUpdate = (id, value) => setCategories(categories.map(cat => cat.id === id ? { ...cat, name: value } : cat));

    const handleApply = () => {
        if (localValue.trim() !== '') hundleUpdate(category.id, localValue);

        setIsEditing(false);
        setLocalValue(category.name);
    }

    return (
        <div className='col'>
            <input type="text" value={localValue} onChange={(e) => setLocalValue(e.target.value)} />
            <button type='button' onClick={() => handleApply()}>Применить</button>
        </div>
    )
}