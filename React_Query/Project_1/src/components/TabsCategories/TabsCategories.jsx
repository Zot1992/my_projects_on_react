import styles from '../TabsCategories/TabsCategories.module.css'
import { NavLink } from "react-router";
import { useGetCategories } from '../../hooks/hooksCategories';

export default function TabsCategories({ }) {

    const { data, isLoading, error } = useGetCategories();

    const categories = data?.body || [];

    const classActive = ({ isActive }) => isActive ? styles.category + ' ' + styles.active : styles.category;

    return (
        <div>
            {isLoading ? <p>Загрузка...</p>
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