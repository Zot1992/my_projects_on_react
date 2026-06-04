import { Category } from "../../../components/category/Category"
import styles from '../PageCategories/PageCategories.module.css'
import { useGetCategories } from "../../../hooks/hooksCategories"

export const PageCategories = ({ }) => {

    const { data, isLoading, error } = useGetCategories();

    const categories = data?.body || [];

    return (
        <main className={styles.pageCategories}>
            {!isLoading && error && <p>Ошибка: {error}</p>}

            {isLoading && !error ? <p>Загрузка...</p>
                : (
                    <div className={styles.pageCategories_container}>
                        <h1>Категории</h1>

                        <div className={styles.categories_item}>
                            {categories.map(category => (
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