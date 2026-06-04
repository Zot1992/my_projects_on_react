import styles from '../PageDashboardArticles/PageDashboardArticles.module.css'
import { ArticleAdmin } from '../../../components/articleAdmin/ArticleAdmin'
import { useEffect, useState } from 'react';
import { fetchGetArtiklesAll } from '../../../api/apiArtikles'
import { useDispatch, useSelector } from 'react-redux'
import { setArtikles } from '../../../store/slices/artiklesSlice'

export const PageDashboardArticles = ({ }) => {

    const dispatch = useDispatch();

    const articles = useSelector(state => state.artikles.arrArtikles)

    const [loading, setLoanding] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchGetArtiklesAll()
            .then((data) => dispatch(setArtikles(data.body || data)))
            .catch((err) => setError(err.message))
            .finally(() => setLoanding(false))
    }, [])

    return (
        <main className={styles.pageDashboardArticles}>

            {!loading && error && <p>Ошибка: {error}</p>}

            {loading && !error && !articles && !articles.length ? <p>Загрузка...</p>
                : (
                    <div className={styles.pageDashboardArticles_container}>

                        <h1>Статьи</h1>

                        <div className={styles.articles}>
                            {articles.map(article => (
                                <ArticleAdmin
                                    key={article.id}
                                    name={article.title}
                                    description={article.content}
                                    id={article.id}
                                />
                            ))}
                        </div>

                    </div>
                )}

        </main>
    )
}