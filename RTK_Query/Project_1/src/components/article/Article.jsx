import styles from '../article/Article.module.css'

export const Article = ({ name, description, children }) => {

    return (
        <main>
            <div className={styles.article}>
                <h3>{name}</h3>
                <p>{description}</p>
                {children}
            </div>
        </main>
    )
}