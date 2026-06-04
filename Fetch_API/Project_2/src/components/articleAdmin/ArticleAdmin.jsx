import { Link } from 'react-router'
import styles from '../articleAdmin/ArticleAdmin.module.css'
import { fetchDeleteArticle } from '../../api/apiArtikles'


export const ArticleAdmin = ({ name, description, id }) => {

    const handleClick = () => {
        fetchDeleteArticle(id)
            .then(data => alert(data.message))
            .catch(err => console.log(err.message))
    }

    return (
        <article className={styles.article}>
            <div className={styles.article_container}>
                <h3>{name}</h3>
                <p>{description}</p>

                <div className={styles.row}>
                    <button className={styles.link} onClick={handleClick}>Удалить</button>
                    < Link className={styles.link} to={`/dashboard/articles/update/${id}`}>Изменить</ Link>
                </div>

            </div>
        </article>
    )
}
