export default function ButtonReset({ dispatch }) {

    const reset = () => {
        dispatch({ type: "RESET" })
    }

    return (
        <button onClick={() => reset()}>Сбросить</button>
    )
}