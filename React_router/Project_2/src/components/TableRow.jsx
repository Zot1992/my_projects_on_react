import { Link } from "react-router"

export const TableRow = ({ id, name, image, place }) => {
    return (
        <tr>
            <td>{place}</td>
            <td><img src={image} alt={name} width='50' /></td>
            <td>{name}</td>
            <td><Link to={`/programming-languages/${id}`}>Подробнее</Link></td>
        </tr>
    )
}