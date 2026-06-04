import { useContext, useState } from "react";
import { useUpdateCategory } from "../hooks/hookCategories";
import { idContext } from "../context/idContext";

export default function FormUpdateCategory({ name, id }) {

    const { mutate, isPending } = useUpdateCategory(id);

    const { setId } = useContext(idContext);

    const [value, setValue] = useState(name);

    const handleClik = async () => {
        if (!value) {
            alert('Введите название категории!')
            return
        }

        mutate({ name: value }, {
            onSuccess(data) {
                alert(data?.message);
                setValue('');
            },
            onError(err) {
                console.log(err);
                alert(err.message)
            }
        })
    }

    return (
        <form className="container" action="">
            <h2>Изменить категорию</h2>
            <div className="row">
                <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Введите категорию" />
                <button type="button" onClick={handleClik} disabled={isPending}>{isPending ? 'Сохранение...' : 'Сохранить'}</button>
            </div>
        </form>
    )
}