import { Link } from "react-router"
import styles from "../../components/category/Category.module.css"



export const Category = ({ category }) => {
    return (
        <main className={styles.category}>
            <div className={styles.category.container}>
                <h3>{category.name}</h3>

                <div className={styles.buttenGrupe}>
                    <button className={styles.link}>Удалить</button>
                    <Link className={styles.link} to={`/dashboard/categories/update/${category.id}`}>Изменить</Link>
                </div>

            </div>

        </main>
    )
}