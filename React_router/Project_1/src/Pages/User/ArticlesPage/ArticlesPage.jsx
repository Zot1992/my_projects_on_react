import styles from '../ArticlesPage/ArticlesPage.module.css'
import { Article } from '../../../components/article/Article'
import { NavLink, useSearchParams, useParams } from 'react-router'
import { useState, useEffect } from 'react'


export const ArticlesPage = ({ articles = [], categories = [] }) => {

    const [isAll, setIsAll] = useState(() => {
        const get = localStorage.getItem('isAll');
        return get ? JSON.parse(get) : true;
    });

    useEffect(() => {
        localStorage.setItem('isAll', JSON.stringify(isAll));
    }, [isAll]);

    const [searchParams, setSearchParams] = useSearchParams();
    const { categorySlug } = useParams();
    const category = categorySlug || searchParams.get('category'); // categorySlug для фильтрации статей по выбранной категории, а searchParams.get('category') для того что бы показать все статьи.

    const filterArticles = category ? articles.filter(article => article.categorySlug === category) : articles;
    const onIsAll = () => setIsAll(true);
    const offIsAll = () => setIsAll(false);

    return (
        <main className={styles.main}>

            <div className={styles.main_container}>
                <h1>Статьи</h1>

                <div className={styles.buttonGroup}>
                    <NavLink className={({ isActive }) => {
                        const isActiveCondition = isAll && isActive;
                        return isActiveCondition ? `${styles.link} ${styles.active}` : styles.link;
                    }}
                        to='/articles' onClick={() => (setSearchParams({}), onIsAll())}>Все</NavLink>
                    {categories.map(category => (
                        <NavLink key={category.id} className={({ isActive }) => isActive ? (`${styles.link} ${styles.active}`) : styles.link} to={`/articles/${category.slug}`}
                            onClick={() => offIsAll()}>{category.name}</NavLink>
                    ))}
                </div>

                <div className={styles.articles}>

                    {filterArticles.map(article => (
                        <Article key={article.id}
                            category={article.categorySlug}
                            article={article} />
                    ))}

                </div>

            </div>

        </main >
    )
}