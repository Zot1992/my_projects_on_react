import { useDeleteCategoryMutation } from "../store/api/apiCategories"

export default function ButtonDelete({ id }) {

    const [deleteCat, { isLoading }] = useDeleteCategoryMutation();

    const handleClik = () => {
        if (!confirm('Вы действительно хотите удалить категорию?')) return

        deleteCat(id).unwrap()
            .then(data => alert(data.message))
            .catch(err => console.log(err.message))
    }

    return (
        <button onClick={handleClik} disabled={isLoading}>{isLoading ? 'Удаление...' : 'Удалить'}</button>
    )
}