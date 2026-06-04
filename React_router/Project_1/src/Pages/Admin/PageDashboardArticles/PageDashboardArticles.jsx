import styles from '../PageDashboardArticles/PageDashboardArticles.module.css'
import { ArticleAdmin } from '../../../components/articleAdmin/ArticleAdmin'

export const PageDashboardArticles = ({ articles }) => {
    return (
        <main className={styles.pageDashboardArticles}>
            <div className={styles.pageDashboardArticles_container}>

                <h1>Статьи</h1>

                <div className={styles.articles}>
                    {articles.map(article => (
                        <ArticleAdmin
                            key={article.id}
                            article={article}
                        />
                    ))}
                </div>

            </div>

        </main>
    )
}