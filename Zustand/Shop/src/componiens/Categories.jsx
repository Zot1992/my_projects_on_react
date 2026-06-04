import Category from "./Category"
import { products } from "../store/bd"

export default function Categories({ }) {

    return (
        <div className="products">
            {products.map(prod => (
                <Category
                    key={prod.id}
                    image={prod.image}
                    title={prod.title}
                    price={prod.price}
                    id={prod.id}
                />
            ))}
        </div>
    )
}