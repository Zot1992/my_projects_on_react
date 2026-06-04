import { NavLink, useParams } from "react-router"
import styles from '../SingleArticlePage/SingleArticlePage.module.css'
import { useGetArticleQuery } from "../../../store/api/apiArticles";

export const SingleArticlePage = ({ }) => {

    const { articleId } = useParams();
    const { data: article, isLoading, error } = useGetArticleQuery(articleId);

    const articleData = article?.body || article;

    if (isLoading) return <div>Загрузка статьи...</div>;
    if (error) return <div>Ошибка загрузки: {error.message}</div>;
    if (!articleData) { return <div>Статья не найдена</div>; }

    return (
        <main className={styles.singleArticlePage}>
            <div className={styles.singleArticlePage_container}>


                <div className={styles.col}>
                    <h1>{articleData.title}</h1>
                    <p>Количество лайков: {articleData.likes}</p>
                    <h3>Описание</h3>
                    <p>{articleData.content}</p>
                </div>



                <NavLink className={styles.link} to={-1}>Назад</NavLink>
            </div>

        </main>

    )
}
