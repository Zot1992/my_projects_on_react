import { Link } from 'react-router'
import styles from '../article/Article.module.css'


export const Article = ({ article, category }) => {

    return (
        <main>
            <div className={styles.article}>
                <h3>{article.name}</h3>
                <p>{article.likes} лайков</p>
                <p>{article.description}</p>
                < Link className={styles.link} to={`/articles/${category}/${article.id}`}>Просмотреть</ Link>
            </div>
        </main>
    )
}