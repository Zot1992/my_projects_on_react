import { useEffect, useState } from "react";
import Category from "../Category/Category"
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from '../../api/apiCategories'
import { setCategories } from "../../store/slices/categoriesSlice";

export default function Categories() {

    const dispatch = useDispatch();

    // const categories = useSelector(state => state.categories.arrCategories);

    const categories = useSelector(state => {
        console.log('Селектор получает:', state.categories.arrCategories);
        return state.categories.arrCategories;
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategories()
            .then(data => dispatch(setCategories(data.body || [])))
            .catch(err => console.log(err.message))
            .finally(() => setLoading(false))
    }, [])

    // console.log('Render - categories:', categories);


    if (loading) return <p>Загрузка...</p>

    return (
        <div className="container">
            {categories && Array.isArray(categories) && categories.length > 0 ? (
                categories.map(cat => {
                    // console.log('Передаю в Category:', {
                    //     key: cat.id,
                    //     name: cat.name,
                    //     typeOfName: typeof cat.name,
                    //     id: cat.id
                    // });
                    return <Category key={cat.id} name={cat.name} id={cat.id} />;
                })
            ) : (
                <p>Нет категорий!</p>
            )}
        </div>
    );
}