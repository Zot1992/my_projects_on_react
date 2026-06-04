import { useEffect, useState } from "react";
import useCart from "../store/cart-store"

export default function Shopping_cart({ }) {

    const [sumPrice, setSumPrice] = useState(0);

    const Cart = useCart(state => state.arrayCart);
    const deleteFromCart = useCart(state => state.deleteFromCart);

    useEffect(() => {
        const total = Cart.reduce((sum, currentItem) => {
            return sum + currentItem.price
        }, 0)

        setSumPrice(total);
    }, [Cart])

    return (
        <div className="Shopping_cart">
            {Cart.length === 0 ? (<p>Корзина пуста</p>)
                : (
                    <div>
                        {Cart.map(item => (
                            <div key={item.id} className="cart_item row">

                                <div className="cart_item__image">
                                    <img src={item.image} alt={item.title} />
                                </div>

                                <div className="cart_item__info col">
                                    <p>{item.title}</p>
                                    <p className="cart_item__info__price">{item.price} ₽</p>
                                    <button className="button_delete" onClick={() => deleteFromCart(item.id)}>Удалить</button>
                                </div>

                            </div>
                        ))}

                        <div className="cart_total col">
                            <div className="cart_total_sum row">
                                <p><strong>Сумма заказа</strong></p>
                                <p className="cart_total__price">{sumPrice} ₽</p>
                            </div>

                            <button>Оформить заказ</button>
                        </div>

                    </div>
                )}
        </div>
    )
}