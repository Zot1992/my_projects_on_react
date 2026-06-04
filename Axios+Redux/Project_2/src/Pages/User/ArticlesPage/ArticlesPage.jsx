import styles from '../ArticlesPage/ArticlesPage.module.css'
import { Article } from '../../../components/article/Article'
import { Link, useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { fetchGetArtikles } from '../../../api/apiArtikles'
import TabsCategories from '../../../components/TabsCategories/TabsCategories'
import { useDispatch, useSelector } from 'react-redux'
import { setArtikles } from '../../../store/slices/artiklesSlice'

export const ArticlesPage = ({ }) => {

    const dispatch = useDispatch();

    const articles = useSelector(state => state.artikles.arrArtikles)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { categorySlug } = useParams();

    useEffect(() => {
        const slug = categorySlug ? categorySlug : 'all';

        fetchGetArtikles(slug)
            .then((data) => {
                // console.log('API response:', data);
                dispatch(setArtikles(data.body || data))
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false))
    }, [categorySlug])

    return (
        <main className={styles.main}>

            <div className={styles.main_container}>

                {loading ? (
                    <p className='loading'>Загрузка...</p>
                ) : error ? (
                    <p className='loading error'>Ошибка: {error}</p>
                ) : (
                    <div>
                        <h1>Статьи</h1>

                        <TabsCategories />

                        {articles.length === 0 ? (
                            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Статьи не найдены!</p>
                        ) : (
                            <div className={styles.articles}>
                                {articles.map(article => (
                                    <Article
                                        key={article.id}
                                        name={article.title}
                                        description={article.content}
                                    >
                                        <Link className={styles.link} to={"/articles/" + article.categorySlug + "/" + article.id}>Просмотреть</Link>
                                    </Article>
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </div>

        </main >
    )
}