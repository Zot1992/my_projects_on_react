import { useState } from "react";
import { useAddCategoryMutation } from "../store/api/apiCategories";

export default function FormCreateCategory({ }) {

    const [newCategory, { isLoading }] = useAddCategoryMutation();

    const [value, setValue] = useState('');

    const handleClik = async () => {
        if (!value) {
            alert('Введите название категории!')
            return
        }
        try {
            await newCategory({ name: value }).unwrap()
                .then(data => alert(data.message))
                .finally(() => setValue(''))
        } catch { err => console.log(err.message) }

    }

    return (
        <form className="container" action="">
            <h2>Добавить категорию</h2>
            <div className="row">
                <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Введите категорию" />
                <button type="button" onClick={handleClik} disabled={isLoading}>{isLoading ? 'Добавление...' : 'Добавить'}</button>
            </div>
        </form>
    )
}