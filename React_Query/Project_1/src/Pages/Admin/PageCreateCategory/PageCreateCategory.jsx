import { useState } from 'react'
import styles from '../PageCreateCategory/PageCreateCategory.module.css'
import { useCreateCategory } from '../../../hooks/hooksCategories';

export const PageCreateCategory = () => {

    const [inpValue, setInpValue] = useState('');

    const { mutate, isPending, error } = useCreateCategory();

    const handleClick = () => {
        if (!inpValue) alert('Введите категорию!!!');

        mutate({ name: inpValue }, {
            onSuccess(data) {
                alert(data?.message)
                setInpValue('')
            },
            onError(err) {
                console.log(err);
                alert(err.message)
            }
        })
    }

    return (
        <main className={styles.PageCreateCategory}>
            {error ? <p>Ошибка: {error}</p> : (
                <div className={styles.PageCreateCategory_container}>

                    <h1>Создать категорию</h1>
                    <div className={styles.row}>
                        <input className={styles.input} type="text" value={inpValue} onChange={e => setInpValue(e.target.value)} placeholder='Название' />
                        <button className={styles.link} onClick={handleClick} disabled={isPending}>{isPending ? 'Создание...' : 'Создать'}</button>
                    </div>

                </div>
            )}


        </main>
    )
}