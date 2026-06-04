import style from '../formAddCategory/FormAddCategory.module.css'
import { useContext, useState } from 'react';
import { CategoriesContext } from '../../context/CategoriesContext';


export default function FormAddCategory() {

    const {categories,setCategories} = useContext(CategoriesContext);

    const [value, setValue] = useState('');

    const hundleAdd = () => {
        if (value !== '') {
            const newCategory = {
                id: crypto.randomUUID(),
                name: value
            };

            setCategories([...categories, newCategory]);
            setValue('');
        }
    };

    return (
        <form className='form indemt'>

            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder='Название' />
            <button type='button' onClick={hundleAdd}>Добавить</button>

        </form>
    )
}