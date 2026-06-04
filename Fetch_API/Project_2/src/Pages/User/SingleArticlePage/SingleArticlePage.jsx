import { NavLink, useParams } from "react-router"
import styles from '../SingleArticlePage/SingleArticlePage.module.css'
import { useEffect, useState } from "react";
import { fetchGetArtikleId } from '../../../api/apiArtikles'


export const SingleArticlePage = ({ }) => {

    const { articleId } = useParams();

    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchGetArtikleId(articleId)
            .then((data) => {
                setIsLoading(false);
                setArticle(data.body);
                console.log(data.body)
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error)
            });
    }, [articleId])

    return (
        <main className={styles.singleArticlePage}>
            <div className={styles.singleArticlePage_container}>
                {isLoading ? <p>Загрузка...</p> :
                    (
                        <div className={styles.col}>
                            <h1>{article.title}</h1>
                            <p>Количество лайков: {article.likes}</p>
                            <h3>Описание</h3>
                            <p>{article.content}</p>
                        </div>
                    )}


                <NavLink className={styles.link} to={-1}>Назад</NavLink>
            </div>

        </main>

    )
}


