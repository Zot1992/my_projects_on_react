import Category from "./Category";
import { useGetCategoriesQuery } from "../store/api/apiCategories";

export default function Categories({ }) {

    const { data, isLoading, error } = useGetCategoriesQuery();

    const categories = data?.body || [];

    if (isLoading) return <p>Загрузка...</p>
    if (error) return <p>Ошибка: {error.message}</p>
    if (categories.length === 0) return <p>Категории не найдены</p>


    return (
        <main className="container">
            {categories && categories.length > 0 && (
                <div>
                    {categories.map(cat => (
                        <Category key={cat.id} name={cat.name} id={cat.id} />
                    ))}
                </div>
            )}

        </main>
    )
}