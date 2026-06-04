import { useEffect, useState } from 'react'
import styles from '../PageUpdateArticle/PageUpdateArticle.module.css'
import { Link, useParams } from 'react-router'
import { useGetCategories } from '../../../hooks/hooksCategories'
import { useGetArticleId } from '../../../hooks/hooksArticles'
import FormUpdateArticle from '../../../components/article/FormUpdateArticle/FormUpdateArticle'


export const PageUpdateArticle = ({ }) => {

    const { articleId } = useParams();

    const { data, isLoading, error } = useGetCategories();
    const { data: art, isLoading: isLoadingArt } = useGetArticleId(articleId);

    const categories = data?.body || [];
    const article = art?.body || [];


    return (
        <main className={styles.pageUpdateArticle}>

            {!isLoadingArt && error && <p>Ошибка: {error}</p>}

            {isLoadingArt && !error ? <p>Загрузка</p>
                : (<div className={styles.pageUpdateArticle_container}>

                    <Link className={styles.link} to={-1}>Назад</Link>
                    <h1>Изменить статью</h1>

                    <FormUpdateArticle categories={categories} article={article} />

                </div>)
            }

        </main>
    )
}