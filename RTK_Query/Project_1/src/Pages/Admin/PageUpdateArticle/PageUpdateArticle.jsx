import { useEffect, useState } from 'react'
import styles from '../PageUpdateArticle/PageUpdateArticle.module.css'
import { Link, useParams } from 'react-router'
import FormUpdateArticle from '../../../components/article/FormUpdateArticle/FormUpdateArticle'
import { useGetCategoriesQuery } from '../../../store/api/apiCategories'
import { useGetArticleQuery, useUpdateArticleMutation } from '../../../store/api/apiArticles'

export const PageUpdateArticle = ({ }) => {

    const { data: cats, isLoading: isLoadingCategories, error: errorCategories } = useGetCategoriesQuery();

    const { articleId } = useParams();

    const { data: art, isLoading, error } = useGetArticleQuery(articleId);

    const categories = cats?.body;
    const article = art?.body;

    if (isLoading) return <p>Загрузка категории...</p>;
    if (error) return <p>Ошибка загрузки: {error.message}</p>;
    if (!article) return <p>Категория не найдена</p>;

    return (
        <main className={styles.pageUpdateArticle}>

            <div className={styles.pageUpdateArticle_container}>

                <Link className={styles.link} to={-1}>Назад</Link>
                <h1>Изменить статью</h1>

                <FormUpdateArticle categories={categories} article={article} />

            </div>

        </main>
    )
}