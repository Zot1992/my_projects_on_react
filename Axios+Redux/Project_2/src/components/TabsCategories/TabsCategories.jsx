import styles from '../TabsCategories/TabsCategories.module.css'
import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { fetchGetCategories } from '../../api/apiCategories'


export default function TabsCategories({ }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGetCategories()
            .then((data) => setCategories(data.body))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }, [])

    const classActive = ({ isActive }) => isActive ? styles.category + ' ' + styles.active : styles.category;

    return (
        <div>
            {loading ? <p>Загрузка...</p>
                : (
                    <div className={styles.categories}>
                        <NavLink to="/articles" end className={classActive}>Все</NavLink>
                        {categories.map((category) => {
                            return (
                                <NavLink key={category.id} to={`/articles/${category.slug}`} className={classActive}>{category.name}</NavLink>
                            )
                        })}
                    </div>
                )}

        </div>
    )
}