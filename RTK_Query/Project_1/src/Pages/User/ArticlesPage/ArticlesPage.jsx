import styles from '../ArticlesPage/ArticlesPage.module.css'
import { Article } from '../../../components/article/Article'
import { Link, useParams, useSearchParams } from 'react-router'
import TabsCategories from '../../../components/TabsCategories/TabsCategories'
import { useGetArticlesAllQuery } from '../../../store/api/apiArticles'

export const ArticlesPage = ({ }) => {

    const { categorySlug } = useParams();
    const [searchParams] = useSearchParams();

    const { data: articles, isLoading, error } = useGetArticlesAllQuery();

    const articlesList = articles?.body || [];

    const filteredArticles = categorySlug
        ? articlesList.filter(article => article.categorySlug === categorySlug)
        : articlesList;

    if (isLoading) return <div>Загрузка статей...</div>;
    if (error) return <div>Ошибка загрузки: {error.message}</div>;

    return (
        <main className={styles.main}>

            <div className={styles.main_container}>

                <div>
                    <h1>Статьи</h1>

                    <TabsCategories />

                    {filteredArticles.length === 0 ? (
                        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Статьи не найдены!</p>
                    ) : (
                        <div className={styles.articles}>
                            {filteredArticles.map(article => (
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

            </div>

        </main >
    )
}