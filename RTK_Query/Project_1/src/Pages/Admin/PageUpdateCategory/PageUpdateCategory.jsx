import { Link, useParams } from "react-router"
import styles from '../PageUpdateCategory/PageUpdateCategory.module.css'
import FormUpdateCategory from "../../../components/category/FormUpdateCategory/FormUpdateCategory"
import { useGetCategoryQuery } from "../../../store/api/apiCategories"

export const PageUpdateCategory = () => {

    const { categoryId } = useParams();

    const { data: cat, isLoading, error } = useGetCategoryQuery(categoryId);

    const category = cat?.body;

    if (isLoading) return <p>Загрузка категории...</p>;
    if (error) return <p>Ошибка загрузки: {error.message}</p>;
    if (!category) return <p>Категория не найдена</p>;

    return (
        <main className={styles.pageUpdateCategory}>
            <div className={styles.pageUpdateCategory_container}>
                <Link className={styles.link} to={-1}>Назад</Link>
                <h1>Изменить категорию</h1>

                <FormUpdateCategory name={category.name} id={category.id} />
            </div>
        </main>
    );
}