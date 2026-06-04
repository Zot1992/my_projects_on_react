import { useContext, useState } from "react";
import { useUpdateCategoryMutation } from "../store/api/apiCategories";
import { idContext } from "../context/idContext";

export default function FormUpdateCategory({ name, id }) {

    const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

    const { setId } = useContext(idContext);

    const [value, setValue] = useState(name);

    const handleClik = async () => {
        if (!value) {
            alert('Введите название категории!')
            return
        }
        try {
            await updateCategory({ id, name: value }).unwrap()
                .then(data => {
                    alert(data.message)
                    console.log(data.body)
                })
                .finally(() => setValue(''))

            setId(null);

        } catch { err => console.log(err.message) }


    }

    return (
        <form className="container" action="">
            <h2>Изменить категорию</h2>
            <div className="row">
                <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Введите категорию" />
                <button type="button" onClick={handleClik} disabled={isLoading}>{isLoading ? 'Сохранение...' : 'Сохранить'}</button>
            </div>
        </form>
    )
}