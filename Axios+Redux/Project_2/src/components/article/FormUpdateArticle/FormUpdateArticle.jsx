import styles from '../FormUpdateArticle/FormUpdateArticle.module.css'
import { useState } from 'react'
import Select from 'react-select'
import { fetchUpdateArticle } from '../../../api/apiArtikles'
import { useDispatch } from 'react-redux'
import { updateArtikle } from '../../../store/slices/artiklesSlice'

export default function FormUpdateArticle({ categories, article }) {

    const dispatch = useDispatch();

    const [inpValue, setInpValue] = useState(article.title);
    const [inpContent, setInpContent] = useState(article.content);
    const [category, setCategory] = useState(article.categorySlug);

    const options = categories.map(category => {
        return {
            value: category.slug,
            label: category.name
        }
    })

    const handleClick = () => {
        if (!inpValue) {
            alert('Введите название статить!!!')
            return
        };
        if (!category) {
            alert('Выберите категорию!!!')
            return
        };

        fetchUpdateArticle(category, article.id, inpValue, inpContent)
            .then(data => {
                alert(data.message)
                dispatch(updateArtikle(data.body || data))
            })
            .catch(err => console.log(err.message))
            .finally(() => {
                setInpValue('')
                setInpContent('')
            })

    }

    return (
        <div className={styles.row}>
            <Select className={styles.select} options={options} value={options.find(opt => opt.value === category)}
                onChange={(selected) => setCategory(selected?.value || '')} placeholder='Выберите категорию' />
            <input className={styles.input} type="text" value={inpValue} onChange={e => setInpValue(e.target.value)} placeholder='Название' />
            <input className={styles.input} type="text" value={inpContent} onChange={e => setInpContent(e.target.value)} placeholder='Описание' />
            <button className={styles.link} onClick={handleClick}>Сохранить</button>
        </div>
    )
}