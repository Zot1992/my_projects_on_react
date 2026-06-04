import { useState } from 'react'
import { createCategory } from '../../api/apiCategories'
import { useDispatch } from 'react-redux';
import { addCategory } from '../../store/slices/categoriesSlice';

export default function FormAddCategory() {

    const dispatch = useDispatch();

    const [inpValue, setInpValue] = useState('');

    const handleAddCategory = () => {
        if (inpValue) {
            createCategory(inpValue)
                .then(data => {
                    alert(data.message)

                    if (data.body) {
                        dispatch(addCategory(inpValue))
                    }
                })
                .catch(err => console.log(err.message))
                .finally(() => setInpValue(''))
        }
    }

    return (
        <form className="container">
            <h2>Добавить категорию</h2>
            <div className="groupItems">
                <input type="text" value={inpValue} onChange={e => setInpValue(e.target.value)} placeholder='Введите название категории' />
                <button type='button' onClick={handleAddCategory}>Добавить</button>
            </div>
        </form>
    )
}