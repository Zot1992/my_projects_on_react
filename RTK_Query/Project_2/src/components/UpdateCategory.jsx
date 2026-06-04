import { useGetCategoryQuery } from "../store/api/apiCategories";
import FormUpdateCategory from "./FormUpdateCategory";

export default function UpdateCategory({ id }) {
    const { data, isLoading, error } = useGetCategoryQuery(id);

    const category = data?.body || null;

    console.log(category)

    if (isLoading) return <p>Загрузка категории...</p>;
    if (error) return <p>Ошибка загрузки: {error.message}</p>;
    if (!category) return <p>Категория не найдена</p>

    return (
        <FormUpdateCategory name={category.name} id={category.id} />

    )
}