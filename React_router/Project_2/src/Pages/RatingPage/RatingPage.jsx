import styles from '../RatingPage/RatingPage.module.css'
import { TableRow } from '../../components/TableRow';


export const RatingPage = ({ cards }) => {

    const sorted = [...cards].sort((a, b) => a.place - b.place);


    return (
        <main className={styles.ratingPage}>
            <div className={styles.ratingPage_container}>
                <h1>Рейтинг</h1>
                <table border={1}>

                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Логотип</th>
                            <th>Название</th>
                            <th>Ссылка</th>
                        </tr>
                    </thead>

                    <tbody>

                        {sorted.map(card => (
                            <TableRow key={card.id}

                                id={card.id}
                                name={card.name}
                                image={card.image}
                                place={card.place}
                            />
                        ))}

                    </tbody>

                </table>

            </div>

        </main>
    )
}