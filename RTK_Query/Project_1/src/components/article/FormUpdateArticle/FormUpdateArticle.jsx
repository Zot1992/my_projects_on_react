import styles from '../FormUpdateArticle/FormUpdateArticle.module.css'
import { useState } from 'react'
import Select from 'react-select'
import { useUpdateArticleMutation } from '../../../store/api/apiArticles'

export default function FormUpdateArticle({ categories, article }) {

    const [mutate, { isLoading, error }] = useUpdateArticleMutation();

    const [inpValue, setInpValue] = useState(article.title);
    const [inpContent, setInpContent] = useState(article.content);
    const [category, setCategory] = useState(article.categorySlug);

    const options = categories.map(category => {
        return {
            value: category.slug,
            label: category.name
        }
    })

    const handleClick = async () => {
        if (!inpValue) {
            alert('Введите название статить!!!')
            return
        };
        if (!category) {
            alert('Выберите категорию!!!')
            return
        };

        try {
            mutate({ categorySlug: category, id: article.id, title: inpValue, content: inpContent }).unwrap()
                .then(data => alert(data.message))
                .finally(() => {
                    setInpValue('')
                    setInpContent('')
                })
        } catch (err) {
            console.error('Ошибка создания категории:', err);
            alert(`Ошибка: ${err.message || 'Неизвестная ошибка'}`);
        }
    }

    return (
        <div className={styles.row}>
            <Select className={styles.select} options={options} value={options.find(opt => opt.value === category)}
                onChange={(selected) => setCategory(selected?.value || '')} placeholder='Выберите категорию' />
            <input className={styles.input} type="text" value={inpValue} onChange={e => setInpValue(e.target.value)} placeholder='Название' disabled={isLoading} />
            <input className={styles.input} type="text" value={inpContent} onChange={e => setInpContent(e.target.value)} placeholder='Описание' disabled={isLoading} />
            <button className={styles.link} onClick={handleClick} disabled={isLoading}>{isLoading ? 'Сохранение...' : 'Сохранить'}</button>
        </div>
    )
}