import useCart from "../store/cart-store"

export default function Category({ image, title, price, id }) {

    const addToCart = useCart(state => state.addToCart);

    return (
        <article className="Card col">
            <img className="Card__img" src={image} alt="" />
            <h2>{title}</h2>
            <div className="row">
                <p className="Card__price">{price} ₽</p>
                <button className="button_add" onClick={() => addToCart(id)}>+</button>
            </div>
        </article>
    )
}