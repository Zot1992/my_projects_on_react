import styles from '../category/Category.module.css'
import { useContext} from 'react';
import ButtonDeleteCategory from '../ButtonDeleteCategory/ButtonDeleteCategory';
import ButtonUpdateCategory from '../ButtonUpdateCategory/ButtonUpdateCategory';
import Editing from '../Editing/Editing';
import { EditingContext } from '../../context/EditingContext';


export default function Category({ category }) {

    const {isEditing, setIsEditing} = useContext(EditingContext);

    return (
        <article className={`${styles.category} indemt col`}>

            {!isEditing && (
                <div style={{ height: '100%' }} className='col'>
                    <h3>{category.name}</h3>
                    <div className='buttonGroup'>

                        <ButtonUpdateCategory/>

                        <ButtonDeleteCategory id={category.id} />

                    </div>
                </div>
            )}

            {isEditing && <Editing category={category} setIsEditing={setIsEditing} />}


        </article>
    )
}