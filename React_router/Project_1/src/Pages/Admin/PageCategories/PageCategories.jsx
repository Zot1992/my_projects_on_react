import { Category } from "../../../components/category/Category"
import styles from '../PageCategories/PageCategories.module.css'

export const PageCategories = ({ categories }) => {

    return (
        <main className={styles.pageCategories}>

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
        </main>
    )
}