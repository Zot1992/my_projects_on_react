import Category from "../category/Category";
import styles from '../categories/Categories.module.css'
import { CategoriesContext } from '../../context/CategoriesContext';
import { useContext } from "react";
import { EditingProvider } from "../../context/EditingContext";

export default function Categories() {

    const { categories } = useContext(CategoriesContext);

    return (
        <main className='col pad indemt'>

            <h1>Категории</h1>

            {categories.length === 0 && <p className={styles.emptyCat}>Создайте первую категорию!</p>}

            {categories.length > 0 && (
                <div className="row">
                    {categories.map(cat => (
                        <EditingProvider key={cat.id}>
                            < Category category={cat} />
                        </EditingProvider>
                    ))}
                </div>
            )}
        </main>
    )
}