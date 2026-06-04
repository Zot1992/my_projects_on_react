import { Link } from 'react-router'
import styles from '../MainPage/MainPage.module.css'
import { Article } from '../../../components/article/Article'
import { useGetArticlesAllLimit_4Query } from '../../../store/api/apiArticles'
import { useEffect } from 'react'

export const MainPage = ({ }) => {

    const { data: articles, isLoading, error } = useGetArticlesAllLimit_4Query();

    const articlesList = articles?.body || [];

    // console.log(articlesList);

    if (isLoading) return <div>Загрузка статей...</div>;
    if (error) return <div>Ошибка загрузки: {error.message}</div>;


    return (
        <main className={styles.main}>

            <div className={styles.main_container}>

                <div className={styles.main_text}>
                    <h1>Главная страница</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum nesciunt iste quibusdam possimus doloribus? Sit quo sequi voluptate esse optio?
                        Officiis dolor blanditiis voluptatum distinctio vitae explicabo libero quas laborum.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum aut labore voluptatem velit magni minus necessitatibus vel beatae esse tempora
                        sapiente delectus impedit soluta ullam, molestiae et est provident maiores.</p>
                </div>

                <h2>Популярные статьи</h2>

                {!isLoading && articlesList && articlesList.length > 0 && (
                    <div className={styles.main_articles}>
                        {articlesList.map(article => (
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
        </main >
    )
}