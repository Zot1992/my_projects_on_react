import styles from '../PageUpdateArticle/PageUpdateArticle.module.css'
import { Link } from 'react-router'
import Select from 'react-select'

export const PageUpdateArticle = ({ categories }) => {

    const options = categories.map(category => {
        return {
            value: category.slug,
            label: category.name
        }
    })


    return (
        <main className={styles.pageUpdateArticle}>
            <div className={styles.pageUpdateArticle_container}>

                <Link className={styles.link} to={-1}>Назад</Link>
                <h1>Изменить статью</h1>

                <div className={styles.row}>
                    <Select className={styles.select} options={options} />
                    <input className={styles.input} type="text" placeholder='Название' />
                    <button className={styles.link}>Сохранить</button>
                </div>

            </div>

        </main>
    )
}