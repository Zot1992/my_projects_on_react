import styles from '../ButtonUpdateCategory/ButtonUpdateCategory.module.css'
import { EditingContext } from '../../context/EditingContext';
import { useContext } from 'react';


export default function ButtonUpdateCategory({ }) {

    const { setIsEditing } = useContext(EditingContext);

    const inUpdate = () => setIsEditing(true);

    return (
        <button onClick={inUpdate}>Изменить</button>

    )
}