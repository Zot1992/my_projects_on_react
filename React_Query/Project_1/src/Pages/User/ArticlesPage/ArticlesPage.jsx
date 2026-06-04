import styles from '../ArticlesPage/ArticlesPage.module.css'
import { Article } from '../../../components/article/Article'
import { Link, useParams } from 'react-router'
import { useGetArticles } from '../../../hooks/hooksArticles'
import TabsCategories from '../../../components/TabsCategories/TabsCategories'

export const ArticlesPage = ({ }) => {


    const { categorySlug } = useParams();
    const slug = categorySlug ? categorySlug : 'all';
    const { data, isLoading, error } = useGetArticles(slug);

    const articles = data?.body || [];

    return (
        <main className={styles.main}>

            <div className={styles.main_container}>

                {!isLoading && error && <p className='loading error'>Ошибка: {error}</p>}

                {isLoading && !error ? <p className='loading'>Загрузка...</p>
                    : (<div>
                        <h1>Статьи</h1>

                        <TabsCategories />

                        <div className={styles.articles}>
                            {articles.length === 0 ? <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Статьи не найдены!</p>
                                : articles.map(article => (
                                    <Article
                                        key={article.id}
                                        name={article.title}
                                        description={article.content}
                                    >
                                        <Link className={styles.link} to={"/articles/" + article.categorySlug + "/" + article.id}>Просмотреть</Link>
                                    </Article>
                                ))}

                        </div>
                    </div>
                    )}

            </div>

        </main >
    )
}