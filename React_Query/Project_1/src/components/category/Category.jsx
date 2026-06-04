import { Link } from "react-router"
import styles from "../../components/category/Category.module.css"
import { useDeleteCategory } from "../../hooks/hooksCategories"


export const Category = ({ category }) => {

    const { mutate, isPending } = useDeleteCategory(category.id);

    const handleClick = () => {
        if (!confirm("Вы действительно хотите удалить категорию?")) return;

        mutate(null, {
            onSuccess(data) {
                alert(data?.message)
            },
            onError(err) {
                console.log(err);
                alert(err.message)
            }
        })
    }

    return (
        <main className={styles.category}>
            <div className={styles.category.container}>
                <h3>{category.name}</h3>

                <div className={styles.buttenGrupe}>
                    <button className={styles.link} onClick={handleClick}>{isPending ? 'Удаление...' : 'Удалить'}</button>
                    <Link className={styles.link} to={`/dashboard/categories/update/${category.id}`}>Изменить</Link>
                </div>

            </div>

        </main>
    )
}