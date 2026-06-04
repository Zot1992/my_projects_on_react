import { Category } from "../../../components/category/Category"
import styles from '../PageCategories/PageCategories.module.css'
import { fetchGetCategories } from '../../../api/apiCategories'
import { useEffect, useState } from "react"

export const PageCategories = ({ }) => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchGetCategories()
            .then(data => setCategories(data.body))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return (
        <main className={styles.pageCategories}>
            {!loading && error && <p>Ошибка: {error}</p>}

            {loading && !error ? <p>Загрузка...</p>
                : (
                    <div className={styles.pageCategories_container}>
                        <h1>Категории</h1>

                        <div className={styles.categories_item}>
                            {categories.map(category => (
                                <Category key={category.id}
                                    category={category}
                                />
                            ))}
                        </div>
                    </div>
                )}
        </main>
    )
}