import styles from '../PageCreateArticle/PageCreateArticle.module.css'
import Select from 'react-select'

export const PageCreateArticle = ({ categories }) => {

    const options = categories.map(category => {
        return {
            value: category.slug,
            label: category.name
        }
    })

    return (
        <main className={styles.pageCreateArticle}>

            <div className={styles.pageCreateArticle_container}>
                <h1>Создать статью</h1>

                <div className={styles.row}>
                    <Select className={styles.select} options={options} />

                    {/* <select>
                        <option value={''}>Выбрать категорию</option>
                        {categories.map(cat => (
                            <option value={cat.slug}>{cat.name}</option>
                        ))}
                    </select> */}

                    <input className={styles.input} type="text" placeholder='Название' />
                    <button className={styles.link}>Создать</button>
                </div>

            </div>

        </main>
    )
}