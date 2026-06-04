import { Category } from "../../../components/category/Category"
import styles from '../PageCategories/PageCategories.module.css'
import { fetchGetCategories } from '../../../api/apiCategories'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCategories } from "../../../store/slices/categoriesSlice"

export const PageCategories = ({ }) => {

    const dispatch = useDispatch();

    const categories = useSelector(state => state.categories.arrCategories)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchGetCategories()
            .then(data => {
                dispatch(setCategories(data.body || data))
                // console.log(data.body)
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return (
        <main className={styles.pageCategories}>
            {!loading && error && <p>Ошибка: {error}</p>}

            {!loading && !error && categories && categories.length ? (
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
            ) : <p>Загрузка...</p>}
        </main>
    )
}