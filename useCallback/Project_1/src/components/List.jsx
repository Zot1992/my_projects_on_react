import { useContext } from "react";
import { ContextList } from "../context/ContextList";
import Item from "./Item";
import ButtonDelete from "./ButtonDelete";

export default function List({ }) {

    const { list } = useContext(ContextList)

    if (!list || list.length === 0) {
        return <p style={{ fontSize: 30, fontWeight: 700 }}>Список пуст!!!</p>;
    }

    return (
        <div>
            <ul>
                {list.map(item => (
                    <Item key={item.id}
                        number_1={item.number_1}
                        number_2={item.number_2}
                        result={item.result}
                    />
                ))}
            </ul>

            <ButtonDelete />
        </div>
    )
}