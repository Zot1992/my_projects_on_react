export default function ButtonMinus({ dispatch }) {

    const decrement = () => {
        dispatch({ type: "DECREMENT" })
    }

    return (
        <button onClick={() => decrement()}>Увеличить -</button>
    )
}