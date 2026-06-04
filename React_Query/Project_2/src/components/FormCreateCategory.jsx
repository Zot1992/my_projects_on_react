import { useState } from "react";
import { useCreateCategory } from "../hooks/hookCategories";

export default function FormCreateCategory({ }) {

    const [value, setValue] = useState('');

    const {mutate, isPending} = useCreateCategory();

    const handleClik = () => {
        if (!value) {
            alert('Введите название категории!')
            return
        }

        mutate({ name: value }, {
            onSuccess(data) {
                alert(data?.message)
                setValue('')
            },
            onError(err) {
                console.log(err);
                alert(err.message)
            }
        })

    }

    return (
        <form className="container" action="">
            <h2>Добавить категорию</h2>
            <div className="row">
                <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Введите категорию" />
                <button type="button" onClick={handleClik} disabled={isPending}>{isPending ? 'Добавление...' : 'Добавить'}</button>
            </div>
        </form>
    )
}