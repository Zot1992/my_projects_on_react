import styles from '../PageCreateArticle/PageCreateArticle.module.css'
import Select from 'react-select'
import { useGetCategories } from '../../../hooks/hooksCategories'
import { useCreateArticle } from '../../../hooks/hooksArticles'
import { useState } from 'react'

export const PageCreateArticle = ({ }) => {

    const [inpValue, setInpValue] = useState('');
    const [inpContent, setInpContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const { data, isLoading, error } = useGetCategories();
    const { mutate, isPending } = useCreateArticle();

    const categories = data?.body || [];

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

        mutate({ title: inpValue, content: inpContent, categorySlug: selectedCategory }, {
            onSuccess(data) {
                alert(data?.message)
                setInpValue(''),
                    setInpContent('')
            },
            onError(err) {
                console.log(err);
                alert(err.message)
            }
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
                    <button className={styles.link} onClick={handleClick} disabled={isPending}>{isPending ? 'Создание...' : 'Создать'}</button>
                </div>

            </div>

        </main>
    )
}