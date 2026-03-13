import useCart from "../store/cart-store"

export default function Goods_counter({ }) {

    const quantity = useCart(state => state.arrayCart);

    return (
        <span className="cart_count">{quantity.length}</span>
    )
}