import styles from '../TabsCategories/TabsCategories.module.css'
import { NavLink } from "react-router";
import { useGetCategoriesQuery } from '../../store/api/apiCategories';

export default function TabsCategories({ }) {

    const { data: categories, isLoading, error } = useGetCategoriesQuery();

    const categoriesList = categories?.body || [];

    // console.log(categoriesList);

    const classActive = ({ isActive }) => isActive ? styles.category + ' ' + styles.active : styles.category;

    if (isLoading) return <div>Загрузка категорий...</div>;
    if (error) return <div>Ошибка загрузки: {error.message}</div>;

    return (
        <div>
            {categoriesList.length > 0 && (
                <div className={styles.categories}>
                    <NavLink to="/articles" end className={classActive}>Все</NavLink>
                    {categoriesList.map((category) => {
                        return (
                            <NavLink key={category.id} to={`/articles/${category.slug}`} className={classActive}>{category.name}</NavLink>
                        )
                    })}
                </div>
            )}

        </div>
    )
}