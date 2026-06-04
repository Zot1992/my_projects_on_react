import { Link } from "react-router"
import styles from "../../components/category/Category.module.css"
import { fetchDeleteCategory } from '../../api/apiCategories'


export const Category = ({ category }) => {

    const handleClick = () => {
        if (!confirm("Вы действительно хотите удалить категорию?")) return;

        fetchDeleteCategory(category.id)
            .then(data => alert(data.message))
            .catch(err => console.log(err.message))
    }

    return (
        <main className={styles.category}>
            <div className={styles.category.container}>
                <h3>{category.name}</h3>

                <div className={styles.buttenGrupe}>
                    <button className={styles.link} onClick={handleClick}>Удалить</button>
                    <Link className={styles.link} to={`/dashboard/categories/update/${category.id}`}>Изменить</Link>
                </div>

            </div>

        </main>
    )
}