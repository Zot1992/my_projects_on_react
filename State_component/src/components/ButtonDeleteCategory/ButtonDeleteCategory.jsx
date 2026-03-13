import styles from '../ButtonDeleteCategory/ButtonDeleteCategory.module.css'
import { CategoriesContext } from '../../context/CategoriesContext';
import { useContext } from 'react';


export default function ButtonDeleteCategory({ id }) {

    const { categories, setCategories } = useContext(CategoriesContext);

    const handleDelete = () => {
        if (confirm('Вы уверены что хотите удалить данную категорию?')) {
            setCategories(categories.filter(cat => cat.id !== id));
        }
    }

    return (
        <button onClick={handleDelete}>Удалить</button>

    )

}