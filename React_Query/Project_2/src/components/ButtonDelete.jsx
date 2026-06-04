import { useDeleteCategory } from "../hooks/hookCategories";

export default function ButtonDelete({ id }) {

    const { mutate, isPending } = useDeleteCategory(id);

    const handleClik = () => {
        if (!confirm('Вы действительно хотите удалить категорию?')) return

        mutate(null, {
            onSuccess(data) {
                alert(data.message)
            },
            onError(err) {
                console.log(err);
                alert(err.message)
            }
        })
    }

    return (
        <button onClick={handleClik} disabled={isPending}>{isPending ? 'Удаление...' : 'Удалить'}</button>
    )
}