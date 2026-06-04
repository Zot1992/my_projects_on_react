import { useContext } from "react";
import Item from "./Item";
import { ItemsContext } from "../context/ItemsContext";

export default function Items({ }) {

    const { users } = useContext(ItemsContext);

    return (
        <div>
            {!users && users.length < 0 ? <p>Список пуст!!!</p> :
                (<ul>
                    {users.map(item => (
                        <Item key={item.id}
                            name={item.name}
                            age={item.age} />
                    ))}
                </ul>)
            }
        </div>
    )
}