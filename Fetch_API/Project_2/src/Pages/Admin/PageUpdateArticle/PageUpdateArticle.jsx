import { useEffect, useState } from 'react'
import styles from '../PageUpdateArticle/PageUpdateArticle.module.css'
import { Link, useParams } from 'react-router'
import { fetchGetCategories } from '../../../api/apiCategories'
import { fetchGetArtikleId } from '../../../api/apiArtikles'
import FormUpdateArticle from '../../../components/article/FormUpdateArticle/FormUpdateArticle'
// import Select from 'react-select'

export const PageUpdateArticle = ({ }) => {

    const { articleId } = useParams();
    const [categories, setCategories] = useState([]);
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchGetCategories()
            .then(data => setCategories(data.body))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        fetchGetArtikleId(articleId)
            .then(data => setArticle(data.body))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [articleId])

    // const options = categories.map(category => {
    //     return {
    //         value: category.slug,
    //         label: category.name
    //     }
    // })


    return (
        <main className={styles.pageUpdateArticle}>

            {!loading && error && <p>Ошибка: {error}</p>}

            {loading && !error ? <p>Загрузка</p>
                : (<div className={styles.pageUpdateArticle_container}>

                    <Link className={styles.link} to={-1}>Назад</Link>
                    <h1>Изменить статью</h1>

                    {/* <div className={styles.row}>
                    <Select className={styles.select} options={options} />
                    <input className={styles.input} type="text" placeholder='Название' />
                    <button className={styles.link}>Сохранить</button>
                </div> */}

                    <FormUpdateArticle categories={categories} article={article}/>

                </div>)
            }

        </main>
    )
}