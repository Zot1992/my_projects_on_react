import { NavLink, useParams } from "react-router"
import styles from '../SingleArticlePage/SingleArticlePage.module.css'
import { useEffect, useState } from "react";
import { fetchGetArtikleId } from '../../../api/apiArtikles'
import { useDispatch, useSelector } from "react-redux";
import { setArtikle } from "../../../store/slices/artiklesSlice";

export const SingleArticlePage = ({ }) => {

    const dispatch = useDispatch();

    const article = useSelector(state => state.artikles.artikle);

    const { articleId } = useParams();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchGetArtikleId(articleId)
            .then((data) => {
                dispatch(setArtikle(data.body || data));
                // console.log(data.body)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => setIsLoading(false))
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


