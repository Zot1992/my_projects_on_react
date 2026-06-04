import { Link, useParams } from "react-router"
import styles from '../PageUpdateCategory/PageUpdateCategory.module.css'
import { useGetCategoryId } from "../../../hooks/hooksCategories"
import { useEffect, useState } from "react"
import FormUpdateCategory from "../../../components/category/FormUpdateCategory/FormUpdateCategory"


export const PageUpdateCategory = () => {

    const { categoryId } = useParams();

    const { data, isLoading, error } = useGetCategoryId(categoryId);

    const category = data?.body || {};

    return (
        <main className={styles.pageUpdateCategory}>
            {isLoading ? <p>Загрузка...</p>
                : (<div className={styles.pageUpdateCategory_container}>
                    <Link className={styles.link} to={-1}>Назад</Link>
                    <h1>Изменить категорию</h1>

                    <FormUpdateCategory name={category.name} id={category.id} />
                </div>
                )}
        </main>
    )
}