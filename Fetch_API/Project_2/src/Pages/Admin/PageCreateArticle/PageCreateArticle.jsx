import styles from '../PageCreateArticle/PageCreateArticle.module.css'
import Select from 'react-select'
import { fetchGetCategories } from '../../../api/apiCategories'
import { fetchCreateArticle } from '../../../api/apiArtikles'
import { useEffect, useState } from 'react'

export const PageCreateArticle = ({ }) => {

    const [categories, setCategories] = useState([]);
    const [inpValue, setInpValue] = useState('');
    const [inpContent, setInpContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchGetCategories()
            .then(data => setCategories(data.body))
            .catch(err => console.log(err.message))
    }, [])

    const options = categories.map(category => {
        return {
            value: category.slug,
            label: category.name
        }
    })

    const handleClick = () => {
        if (!inpValue) {
            alert('Введите название категории!!!')
            return
        }
        if (!selectedCategory) {
            alert('Выберите категорию!!!')
            return
        };

        fetchCreateArticle(selectedCategory, inpValue, inpContent)
            .then(data => alert(data.message))
            .catch((err) => setError(err.message))
            .finally(() => {
                setInpValue('');
                setInpContent('');
                setSelectedCategory('');
            })
    }

    return (
        <main className={styles.pageCreateArticle}>

            <div className={styles.pageCreateArticle_container}>
                <h1>Создать статью</h1>

                <div className={styles.row}>
                    <Select className={styles.select} options={options} value={options.find(opt => opt.value === selectedCategory)}
                        onChange={(selected) => setSelectedCategory(selected?.value || '')} placeholder="Выберите категорию" />
                    <input className={styles.input} type="text" value={inpValue} onChange={e => setInpValue(e.target.value)} placeholder='Название' />
                    <input className={styles.input} type="text" value={inpContent} onChange={e => setInpContent(e.target.value)} placeholder='Описание' />
                    <button className={styles.link} onClick={handleClick}>Создать</button>
                </div>

            </div>

        </main>
    )
}