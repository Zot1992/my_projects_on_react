import styles from '../FormUpdateCategory/FormUpdateCategory.module.css'
import { useState } from "react"
import { fetchUpdateCategory } from '../../../api/apiCategories'
import { useDispatch } from 'react-redux';
import { updateCategory } from '../../../store/slices/categoriesSlice';


export default function FormUpdateCategory({ name, id }) {

    const dispatch = useDispatch();

    const [inpValue, setInpValue] = useState(name);

    const handleClick = () => {
        if (!inpValue) alert('Введите название категории!!!')

        fetchUpdateCategory(id, inpValue)
            .then(data => {
                alert(data.message)
                dispatch(updateCategory(data.body || data))
            })
            .catch(err => console.log(err.message))
            .finally(() => setInpValue(''))
    }

    return (
        <div className={styles.row}>
            <input className={styles.input} type="text" value={inpValue} onChange={e => setInpValue(e.target.value)} placeholder="Название" />
            <button className={styles.link} onClick={handleClick}>Сохранить</button>
        </div>
    )
}