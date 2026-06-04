import styles from '../FormUpdateCategory/FormUpdateCategory.module.css'
import { useState } from "react"
import { useUpdateCategory } from '../../../hooks/hooksCategories';


export default function FormUpdateCategory({ name, id }) {

    const [inpValue, setInpValue] = useState(name);

    const { mutate, isPending } = useUpdateCategory(id);

    const handleClick = () => {
        if (!inpValue) alert('Введите название категории!!!')

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
        <div className={styles.row}>
            <input className={styles.input} type="text" value={inpValue} onChange={e => setInpValue(e.target.value)} placeholder="Название" />
            <button className={styles.link} onClick={handleClick}>Сохранить</button>
        </div>
    )
}