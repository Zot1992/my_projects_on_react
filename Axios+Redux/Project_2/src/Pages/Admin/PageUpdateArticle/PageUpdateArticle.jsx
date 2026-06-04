import { useEffect, useState } from 'react'
import styles from '../PageUpdateArticle/PageUpdateArticle.module.css'
import { Link, useParams } from 'react-router'
import { fetchGetCategories } from '../../../api/apiCategories'
import { fetchGetArtikleId } from '../../../api/apiArtikles'
import FormUpdateArticle from '../../../components/article/FormUpdateArticle/FormUpdateArticle'
import { useDispatch, useSelector } from 'react-redux'
import { setArtikle } from '../../../store/slices/artiklesSlice'
import { setCategories } from '../../../store/slices/categoriesSlice'

export const PageUpdateArticle = ({ }) => {

    const dispatch = useDispatch();

    const categories = useSelector(state => state.categories.arrCategories);
    const article = useSelector(state => state.artikles.artikle);

    const { articleId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchGetCategories()
            .then(data => dispatch(setCategories(data.body)))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        fetchGetArtikleId(articleId)
            .then(data => dispatch(setArtikle(data.body)))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [articleId])

    return (
        <main className={styles.pageUpdateArticle}>

            {loading ? <p>Загрузка...</p>
                : error ? <p>Ошибка: {error}</p>
                    : categories && article ? (
                        (<div className={styles.pageUpdateArticle_container}>

                            <Link className={styles.link} to={-1}>Назад</Link>
                            <h1>Изменить статью</h1>

                            <FormUpdateArticle categories={categories} article={article} />

                        </div>)
                    ) : <p>Статья не найдена!</p>}
        </main>
    )
}