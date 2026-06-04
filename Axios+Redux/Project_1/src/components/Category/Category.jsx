import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../api/apiCategories'
import { setCategory, openUpdateCategory } from '../../store/slices/categoriesSlice';


export default function Category({ name, id }) {

    const dispatch = useDispatch();

    if (typeof name !== 'string') {
        console.warn('name не является строкой:', name);
        name = 'Без названия';
    }
    if (typeof id !== 'string' && typeof id !== 'number') {
        console.warn('id не является строкой/числом:', id);
        id = 'no-id';
    }

    const handleDelete = () => {
        deleteCategory(id)
            .then(data => alert(data.message))
            .catch(err => console.log(err.message))
    }

    const handleUpdate = () => {
        dispatch(openUpdateCategory(true));
        dispatch(setCategory(id))
    }


    return (
        <div className="category">
            <h3>{name}</h3>

            <div className="groupItems">
                <button onClick={handleDelete}>Удалить</button>
                <button onClick={handleUpdate}>Изменить</button>
            </div>
        </div>
    )
}