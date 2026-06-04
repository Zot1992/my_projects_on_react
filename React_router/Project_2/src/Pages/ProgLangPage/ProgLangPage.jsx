import styles from './ProgLangPage.module.css';
import { Card } from '../../components/Card'

export const ProgLangPage = ({ cards }) => {



    return (
        <main className={styles.progLangPage}>
            <div className={styles.progLangPage_container}>
                <h1>Языки программирования</h1>

                <div className={styles.cards}>
                    {cards.length > 0 ?
                        (cards.map(card => (
                            <Card key={card.id}
                                card={card}
                            />
                        ))
                        ) : <p>Карточки не найдены</p>
                    }
                </div>
            </div>
        </main>
    )
}