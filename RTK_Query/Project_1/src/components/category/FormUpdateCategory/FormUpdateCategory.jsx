import { useUpdateCategoryMutation } from '../../../store/api/apiCategories';
import styles from '../FormUpdateCategory/FormUpdateCategory.module.css'
import { useState } from "react"

export default function FormUpdateCategory({ name, id }) {

    const [mutate, { isLoading, error }] = useUpdateCategoryMutation();

    const [inpValue, setInpValue] = useState(name);

    const handleClick = async () => {
        if (!inpValue) {
            alert('Введите название категории!!!');
            return
        }
        try {
            await mutate({ id, name: inpValue }).unwrap()
                .then(data => alert(data.message))
                .finally(() => setInpValue(''))
        } catch (err) {
            console.error('Ошибка создания категории:', err);
            alert(`Ошибка: ${err.message || 'Неизвестная ошибка'}`);
        }
    }

    return (
        <div className={styles.row}>
            <input className={styles.input} type="text" value={inpValue} onChange={e => setInpValue(e.target.value)} placeholder="Название" disabled={isLoading} />
            <button className={styles.link} onClick={handleClick} disabled={isLoading}>{isLoading ? 'Сохранение...' : 'Сохранить'}</button>
        </div>
    )
}