import { Link } from 'react-router'
import styles from '../articleAdmin/ArticleAdmin.module.css'


export const ArticleAdmin = ({ article }) => {
    return (
        <article className={styles.article}>
            <div className={styles.article_container}>
                <h3>{article.name}</h3>
                <p>{article.likes} лайков</p>
                <p>{article.description}</p>

                <div className={styles.row}>
                    <button className={styles.link}>Удалить</button>
                    < Link className={styles.link} to={`/dashboard/articles/update/${article.id}`}>Изменить</ Link>
                </div>

            </div>
        </article>
    )
}
