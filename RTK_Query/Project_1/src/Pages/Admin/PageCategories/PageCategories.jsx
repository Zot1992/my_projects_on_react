import { Category } from "../../../components/category/Category"
import styles from '../PageCategories/PageCategories.module.css'
import { useGetCategoriesQuery } from "../../../store/api/apiCategories";

export const PageCategories = ({ }) => {

    const { data: categories, isLoading, error } = useGetCategoriesQuery();

    const categoriesList = categories?.body || [];

    console.log(categoriesList);

    if (isLoading) return <div>Загрузка категорий...</div>;
    if (error) return <div>Ошибка загрузки: {error.message}</div>;

    return (
        <main className={styles.pageCategories}>


            {categoriesList && categoriesList.length > 0 && (
                <div className={styles.pageCategories_container}>
                    <h1>Категории</h1>

                    <div className={styles.categories_item}>
                        {categoriesList.map(category => (
                            <Category key={category.id}
                                category={category}
                            />
                        ))}
                    </div>
                </div>
            )}
        </main>
    )
}