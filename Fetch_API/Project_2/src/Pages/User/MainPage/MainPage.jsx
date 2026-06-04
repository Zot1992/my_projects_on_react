import { Link } from 'react-router'
import styles from '../MainPage/MainPage.module.css'
import { Article } from '../../../components/article/Article'
import { fetchGetArtiklesAllLimit_4 } from '../../../api/apiArtikles'
import { useEffect, useState } from 'react'

export const MainPage = ({ }) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoanding] = useState(true);

    useEffect(() => {
        fetchGetArtiklesAllLimit_4()
            .then((data) => setArticles(data.body))
            .catch((error) => console.log(error))
            .finally(() => setLoanding(false))
    }, [])


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

                {loading ? <p>Загрузка...</p>
                    : (
                        <div className={styles.main_articles}>
                            {articles.map(article => (
                                <Article
                                    key={article.id}
                                    name={article.title}
                                    description={article.content}
                                >
                                    <Link to={"/articles/" + article.categorySlug + "/" + article.id}>Просмотреть</Link>
                                </Article>
                            ))}
                        </div>
                    )}





            </div>


        </main >
    )
}