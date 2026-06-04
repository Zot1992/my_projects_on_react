import { useState } from 'react'
import styles from '../PageCreateCategory/PageCreateCategory.module.css'
import { fetchCreateCategory } from '../../../api/apiCategories'

export const PageCreateCategory = () => {

    const [inpValue, setInpValue] = useState('');
    const [error, setError] = useState('');

    const handleClick = () => {
        if (!inpValue) alert('Введите категорию!!!');

        fetchCreateCategory(inpValue)
            .then(((data) => alert(data.message)))
            .catch((err) => setError(err.message))
            .finally(() => setInpValue(''))
    }

    return (
        <main className={styles.PageCreateCategory}>
            {error ? <p>Ошибка: {error}</p> : (
                <div className={styles.PageCreateCategory_container}>

                    <h1>Создать категорию</h1>
                    <div className={styles.row}>
                        <input className={styles.input} type="text" value={inpValue} onChange={e => setInpValue(e.target.value)} placeholder='Название' />
                        <button className={styles.link} onClick={handleClick}>Создать</button>
                    </div>

                </div>
            )}


        </main>
    )
}