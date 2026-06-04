import { useContext } from "react"
import { ContextList } from "../context/ContextList"

export default function ButtonDelete({ }) {

    const { setList } = useContext(ContextList);

    const handleClik = () => {
        if (!confirm('Вы уверены что хотите удалить все расчеты?')) return
        setList([]);
    }

    return (
        <button onClick={handleClik}>Удалить все расчеты</button>
    )
}