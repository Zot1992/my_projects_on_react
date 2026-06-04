import styles from '../PageDashboardArticles/PageDashboardArticles.module.css'
import { ArticleAdmin } from '../../../components/articleAdmin/ArticleAdmin'
import { useGetArticlesAllQuery } from '../../../store/api/apiArticles'

export const PageDashboardArticles = ({ }) => {

    const { data: articles, isLoading, error } = useGetArticlesAllQuery();

    const articlesList = articles?.body || [];

    // console.log(articlesList)

    if (isLoading) return <div>Загрузка статей...</div>;
    if (error) return <div>Ошибка загрузки: {error.message}</div>;

    return (
        <main className={styles.pageDashboardArticles}>

            {articlesList && articlesList.length > 0 && (
                <div className={styles.pageDashboardArticles_container}>

                    <h1>Статьи</h1>

                    <div className={styles.articles}>
                        {articlesList.map(article => (
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