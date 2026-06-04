import { Link } from 'react-router'
import styles from '../MainPage/MainPage.module.css'


export const MainPage = ({ }) => {
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

                <div className={styles.main_articles}>
                    <h2>Популярные статьи</h2>

                    <div className={styles.articles}>
                        <div className={styles.article}>
                            <h3>Что такое npm?</h3>
                            <i>155 лайков</i>
                            <p>Node Package Manager (npm) - дефолтный пакетный менеджер для JavaScript, работающий на Node.js. Менеджер npm</p>
                            <Link className={styles.link} to="/articles/javascript/3">Просмотреть</Link>
                        </div>

                        <div className={styles.article}>
                            <h3>Компоненты и пропсы</h3>
                            <i>115 лайков</i>
                            <p>Компоненты позволяют разбить интерфейс на независимые части, про которые легко думать в отдельности. Их можно</p>
                            <Link className={styles.link} to="/articles/react/7">Просмотреть</Link>
                        </div>

                        <div className={styles.article}>
                            <h3>Маршрутизация в React Router</h3>
                            <i>97 лайков</i>
                            <p>React Router — решение для переключения и маршрутизации страниц React. Библиотека появилась еще в 2014 год</p>
                            <Link className={styles.link} to="/articles/react/2">Просмотреть</Link>
                        </div>

                        <div className={styles.article}>
                            <h3>Условный рендеринг</h3>
                            <i>74 лайков</i>
                            <p>React позволяет разделить логику на независимые компоненты. Эти компоненты можно показывать или прятать в</p>
                            <Link className={styles.link} to="/articles/react/5">Просмотреть</Link>
                        </div>

                    </div>

                </div>

            </div>


        </main>
    )
}