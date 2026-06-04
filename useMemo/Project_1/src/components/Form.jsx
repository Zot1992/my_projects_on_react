import { useEffect, useMemo, useState } from "react"
import { useContext } from "react";
import { ItemsContext } from "../context/ItemsContext";
import { arrUsers } from "../db";


export default function Form({ }) {

    const [value, setValue] = useState('');
    const [isAscending, setIsAscending] = useState(true)

    const { users, setUsers } = useContext(ItemsContext);


    useEffect(() => {
        if (value) {
            const filtred = users.filter(user => user.name.toLowerCase().includes(value.toLowerCase()))
            setUsers(filtred)
        } else {
            setUsers(arrUsers)
        }
    }, [value])

    const sort = (arr, ascending) => {
        const result = [...arr].sort((a, b) =>
            ascending ? a.age - b.age : b.age - a.age)

        return result
    }

    const sorted = useMemo(() => {
        return sort(users, isAscending)
    }, [users, isAscending]);

    const handleClick = () => {
        setUsers(sorted);
        setIsAscending(prev => !prev);
    };

    return (
        <form className="row" action="">
            <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Фильтр по имени..." />
            <div className="grup">
                <p>Сортировать по возрасту:</p>
                <button type="button" onClick={handleClick}>{isAscending ? 'По возврастанию' : 'По убыванию'}</button>

            </div>
        </form>
    )
}