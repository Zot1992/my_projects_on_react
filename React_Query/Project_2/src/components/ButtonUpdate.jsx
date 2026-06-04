import { idContext } from "../context/idContext";
import { useContext } from "react";

export default function ButtonUpdate({ id }) {

    const { setId } = useContext(idContext);

    return (
        <button onClick={() => setId(id)}>Изменить</button>
    )
}