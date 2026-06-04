import { useState } from 'react'
import styles from '../PageCreateCategory/PageCreateCategory.module.css'
import { useCreateCategoryMutation } from '../../../store/api/apiCategories';


export const PageCreateCategory = () => {

    const [mutate, { isLoading, error }] = useCreateCategoryMutation();

    const [inpValue, setInpValue] = useState('');

    const handleClick = async () => {
        if (!inpValue) {
            alert('Введите категорию!!!');
            return
        }

        try {
            await mutate({ name: inpValue }).unwrap().then(data => alert(data.message)).finally(() => setInpValue(''));
        } catch (err) {
            console.error('Ошибка создания категории:', err);
            alert(`Ошибка: ${err.message || 'Неизвестная ошибка'}`);
        }
    }

    return (
        <main className={styles.PageCreateCategory}>
            {error ? <p>Ошибка: {error}</p> : (
                <div className={styles.PageCreateCategory_container}>

                    <h1>Создать категорию</h1>
                    <div className={styles.row}>
                        <input className={styles.input} type="text" value={inpValue} onChange={e => setInpValue(e.target.value)} disabled={isLoading} placeholder='Название' />
                        <button className={styles.link} onClick={handleClick} disabled={isLoading || !inpValue}>{isLoading ? 'Создание...' : 'Создать'}</button>
                    </div>

                </div>
            )}
        </main>
    )
}