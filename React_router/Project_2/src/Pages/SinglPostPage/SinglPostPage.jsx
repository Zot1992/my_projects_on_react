import { NavLink, useParams } from 'react-router';
import styles from '../SinglPostPage/SinglPostPage.module.css'

export const SinglPostPage = ({ cards = [] }) => {

    const { id } = useParams();
    const card = cards.find(c => c.id === parseInt(id));

    return (
        <article className={styles.singlPostPage}>

            <div className={styles.singlPostPage_container}>

                <div className={styles.header_article}>
                    <NavLink className={styles.link} to={-1} >Назад</NavLink>
                    <h3 className={styles.font_bold}>Место в рейтинге: {card.place}</h3>
                </div>

                <div className={styles.body_article}>
                    <h1>{card.name}</h1>
                    <img src={card.image} alt={card.name} width='100' />
                    <p>{card.description}</p>
                </div>

            </div>

        </article>
    )
}
