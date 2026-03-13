export default function ButtonPlus({ dispatch }) {

    const increase = () => {
        dispatch({ type: "INCREMENT" })
    }

    return (
        <button onClick={() => increase()}>Увеличить +</button>
    )
}