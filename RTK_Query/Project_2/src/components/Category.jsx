import ButtonDelete from "./ButtonDelete"
import ButtonUpdate from "./ButtonUpdate"

export default function Category({ name, id }) {

    return (
        <div className="category">
            <h3>{name}</h3>
            <div className="row">
                <ButtonDelete id={id} />
                <ButtonUpdate id={id} />
            </div>
        </div>
    )
}