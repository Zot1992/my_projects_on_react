import { Link, useParams } from "react-router"
import styles from '../PageUpdateCategory/PageUpdateCategory.module.css'
import { fetchGetCategoryId } from '../../../api/apiCategories'
import { useEffect, useState } from "react"
import FormUpdateCategory from "../../../components/category/FormUpdateCategory/FormUpdateCategory"
import { useDispatch, useSelector } from "react-redux"
import { setCategory } from "../../../store/slices/categoriesSlice"


export const PageUpdateCategory = () => {

    const dispatch = useDispatch();

    const category = useSelector(state => state.categories.category)

    const { categoryId } = useParams();
    // const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        fetchGetCategoryId(categoryId)
            .then(data => {
                dispatch(setCategory(data.body))
                // console.log(data.body)
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [categoryId])

    return (
        <main className={styles.pageUpdateCategory}>
            {loading ? <p>Загрузка...</p>
                : error ? <p>Ошибка: {error}</p>
                    : category ? (
                        <div className={styles.pageUpdateCategory_container}>
                            <Link className={styles.link} to={-1}>Назад</Link>
                            <h1>Изменить категорию</h1>

                            <FormUpdateCategory name={category.name} id={category.id} />
                        </div>
                    ) : <p>Категория не найдена</p>}
        </main >
    )
}