import styles from '../PageDashboardArticles/PageDashboardArticles.module.css'
import { ArticleAdmin } from '../../../components/articleAdmin/ArticleAdmin'
import { useEffect, useState } from 'react';
import { fetchGetArtiklesAll } from '../../../api/apiArtikles'

export const PageDashboardArticles = ({ }) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoanding] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchGetArtiklesAll()
            .then((data) => setArticles(data.body))
            .catch((err) => setError(err.message))
            .finally(() => setLoanding(false))
    }, [])

    return (
        <main className={styles.pageDashboardArticles}>

            {!loading && error && <p>Ошибка: {error}</p>}

            {loading && !error ? <p>Загрузка...</p>
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