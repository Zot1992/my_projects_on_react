import { Link } from 'react-router'
import styles from '../articleAdmin/ArticleAdmin.module.css'
import { useDeleteArticle } from '../../hooks/hooksArticles'


export const ArticleAdmin = ({ name, description, id }) => {

    const { mutate, isPending } = useDeleteArticle(id);

    const handleClick = () => {
        if (!confirm('Вы действительно хотите удалить статью?')) return;
        mutate(null, {
            onSuccess(data) {
                alert(data?.message)
            },
            onError(err) {
                console.log(err);
                alert(err.message)
            }
        })
    }

    return (
        <article className={styles.article}>
            <div className={styles.article_container}>
                <h3>{name}</h3>
                <p>{description}</p>

                <div className={styles.row}>
                    <button className={styles.link} onClick={handleClick}>{isPending ? 'Удаление...' : 'Удалить'}</button>
                    < Link className={styles.link} to={`/dashboard/articles/update/${id}`}>Изменить</ Link>
                </div>

            </div>
        </article>
    )
}
