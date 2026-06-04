import styles from '../PageCreateCategory/PageCreateCategory.module.css'

export const PageCreateCategory = () => {
    return (
        <main className={styles.PageCreateCategory}>

            <div className={styles.PageCreateCategory_container}>

                <h1>Создать категорию</h1>
                <div className={styles.row}>
                    <input className={styles.input} type="text" placeholder='Название' />
                    <button className={styles.link}>Создать</button>
                </div>

            </div>

        </main>
    )
}