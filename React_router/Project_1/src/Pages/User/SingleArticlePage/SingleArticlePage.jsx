import { NavLink, useParams } from "react-router"
import styles from '../SingleArticlePage/SingleArticlePage.module.css'

export const SingleArticlePage = ({ articles = [] }) => {

    const { articleId } = useParams();
    const article = articles.find(article => article.id === parseInt(articleId));

    return (
        <main className={styles.singleArticlePage}>
            <div className={styles.singleArticlePage_container}>
                <div className={styles.col}>
                    <h1>{article.name}</h1>
                    <p>Количество лайков: {article.likes}</p>
                    <h3>Описание</h3>
                    <p>{article.description}</p>
                </div>

                <NavLink className={styles.link} to={-1}>Назад</NavLink>

            </div>

        </main>

    )
}