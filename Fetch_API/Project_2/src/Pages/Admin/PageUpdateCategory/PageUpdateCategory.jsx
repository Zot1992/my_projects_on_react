import { Link, useParams } from "react-router"
import styles from '../PageUpdateCategory/PageUpdateCategory.module.css'
import { fetchGetCategoryId } from '../../../api/apiCategories'
import { useEffect, useState } from "react"
import FormUpdateCategory from "../../../components/category/FormUpdateCategory/FormUpdateCategory"


export const PageUpdateCategory = () => {

    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchGetCategoryId(categoryId)
            .then(data => setCategory(data.body))
            .catch(err => console.log(err.message))
            .finally(() => setLoading(false))
    }, [categoryId])

    return (
        <main className={styles.pageUpdateCategory}>
            {loading ? <p>Загрузка...</p>
                : (<div className={styles.pageUpdateCategory_container}>
                    <Link className={styles.link} to={-1}>Назад</Link>
                    <h1>Изменить категорию</h1>

                    <FormUpdateCategory name={category.name} id={category.id} />
                </div>
                )}
        </main>
    )
}