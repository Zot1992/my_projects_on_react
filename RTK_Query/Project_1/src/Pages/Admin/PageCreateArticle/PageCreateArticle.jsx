import styles from '../PageCreateArticle/PageCreateArticle.module.css'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { useCreateArticleMutation } from '../../../store/api/apiArticles'
import { useGetCategoriesQuery } from '../../../store/api/apiCategories'

export const PageCreateArticle = ({ }) => {

    const { data: categoriesData, isLoading: isLoadingCategories, error: errorCategories } = useGetCategoriesQuery();
    const [createArticle, { isLoading: isLoadingCreate, error: errorCreate, isSuccess: isSuccessCreate }] = useCreateArticleMutation();

    const [inpValue, setInpValue] = useState('');
    const [inpContent, setInpContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const options = (categoriesData?.body || categoriesData || []).map(category => ({
        value: category.slug,
        label: category.name
    }));

    const handleClick = async () => {
        if (!inpValue) {
            alert('Введите название категории!!!')
            return
        }
        if (!selectedCategory) {
            alert('Выберите категорию!!!')
            return
        };

        try {
            await createArticle({
                title: inpValue,
                content: inpContent,
                categorySlug: selectedCategory
            }).unwrap().then(data => alert(data.message))
                .finally(() => {
                    setInpValue('');
                    setInpContent('');
                    setSelectedCategory('');
                })
        }
        catch (err) {
            console.error('Ошибка создания категории:', err);
            alert(`Ошибка: ${err.message || 'Неизвестная ошибка'}`);
        }
    }

    return (
        <main className={styles.pageCreateArticle}>

            <div className={styles.pageCreateArticle_container}>
                <h1>Создать статью</h1>

                <div className={styles.row}>
                    <Select className={styles.select} options={options} value={options.find(opt => opt.value === selectedCategory)}
                        onChange={(selected) => setSelectedCategory(selected?.value || '')} placeholder="Выберите категорию" />
                    <input className={styles.input} type="text" value={inpValue} onChange={e => setInpValue(e.target.value)} placeholder='Название' disabled={isLoadingCreate} />
                    <input className={styles.input} type="text" value={inpContent} onChange={e => setInpContent(e.target.value)} placeholder='Описание' disabled={isLoadingCreate} />
                    <button className={styles.link} onClick={handleClick} disabled={isLoadingCreate}>{isLoadingCreate ? 'Создание...' : 'Создать'}</button>
                </div>

            </div>

        </main>
    )
}