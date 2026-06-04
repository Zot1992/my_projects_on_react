import { useState } from "react"
import { axiosUpdateCategory } from "../../api/apiCategories";
import { useDispatch, useSelector } from "react-redux";
import { openUpdateCategory } from '../../store/slices/categoriesSlice'


export default function FormUpdateCategory() {

    const dispatch = useDispatch();

    const category = useSelector(state => state.categories.category)

    const [isLoading, setIsLoading] = useState(false);
    const [inpValue, setInpValue] = useState(category?.name || '');

    const handleUpdate = () => {
        if (category && inpValue) {
            setIsLoading(true);
            axiosUpdateCategory(category.id, { name: inpValue })
                .then(data => dispatch(setCategories(data.body)))
                .catch(err => console.log(err.message))
                .finally(() => {
                    setIsLoading(false)
                    dispatch(openUpdateCategory(false))
                })
        }
    }

    return (
        <form className="container">
            <h2>Изменить категорию</h2>
            <div className="groupItems">
                <input type="text" value={inpValue} onChange={e => setInpValue(e.target.value)} placeholder='Введите название категории' />
                <button type='button' onClick={handleUpdate} disabled={isLoading}>Сохранить</button>
            </div>
        </form>
    )
}