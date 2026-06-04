import { Link } from "react-router"
import styles from '../PageUpdateCategory/PageUpdateCategory.module.css'


export const PageUpdateCategory = () => {
    return (
        <main className={styles.pageUpdateCategory}>
            <div className={styles.pageUpdateCategory_container}>
                <Link className={styles.link} to={-1}>Назад</Link>
                <h1>Изменить категорию</h1>
                <div className={styles.row}>
                    <input className={styles.input} type="text" placeholder="Название" />
                    <button className={styles.link}>Сохранить</button>
                </div>
            </div>
        </main>
    )
}