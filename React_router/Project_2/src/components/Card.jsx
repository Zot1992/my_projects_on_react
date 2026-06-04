import { Link } from 'react-router';
import styles from './Card.module.css'


export const Card = ({ card }) => {

    return (
        <Link to={`/programming-languages/${card.id}`} className={styles.card}>
            <img src={card.image} alt={card.name} width='70' />
            <h3>{card.name}</h3>
            <p>{card.description}</p>
        </Link>
    )
}