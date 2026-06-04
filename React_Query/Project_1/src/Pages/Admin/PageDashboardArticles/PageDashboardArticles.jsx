import styles from '../PageDashboardArticles/PageDashboardArticles.module.css'
import { ArticleAdmin } from '../../../components/articleAdmin/ArticleAdmin'
import { useGetArticlesAll } from '../../../hooks/hooksArticles'

export const PageDashboardArticles = ({ }) => {

    const { data, isLoading, error } = useGetArticlesAll();

    const articles = data?.body || [];

    return (
        <main className={styles.pageDashboardArticles}>

            {!isLoading && error && <p>Ошибка: {error.message}</p>}

            {isLoading && !error ? <p>Загрузка...</p>
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