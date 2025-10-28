import { useState } from "react";

const ShoppingCart = ({ cardItems, removeFromCard, isPromoCode, calculateTotal, getPromoCode, cleaningShoppingCart, addMessage }) => {

    const [input, setInput] = useState('');

    const handleApplaePromo = () => {
        if (input.trim()) {
            getPromoCode(input);
            setInput('');
        }
        else {
            addMessage('cart', 'Вы не ввели промокод!');
        }
    }

    const { subTotal, newPrice, total } = calculateTotal();

    return (
        <div className="dont_close">
            <h1 className="text-5xl text-gray-600 mb-5">Корзина</h1>
            {cardItems.length === 0 ? (
                <p className="text-gray-600">Корзина пуста</p>
            ) : (
                <div >
                    {cardItems.map(item => {
                        return (
                            <div key={item.id} className="flex flex-col items-center mt-2 bg-gray-50 rounded-2xl shadow-md p-4 hover:shadow-lg focus:outline-none focus:shadow-outline first:mt-0 last:mb-0">
                                <img src={item.image} alt={`Изображение ${item.product.name}`} className="w-40 h-40 object-cover" />
                                <p className="text-2xl text-gray-600">{item.product.name}</p>
                                <p className="text-orange-400 text-2xl font-bold">{item.quantity * item.product.price} ₽</p>
                                <p className="text-gray-600">Количество: {item.quantity}шт.</p>
                                <button className="m-1 p-5 rounded-2xl cursor-pointer bg-gray-100  hover:bg-gray-200"
                                    onClick={() => removeFromCard(item.id)}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.6663 3.125C12.0115 3.125 12.2913 2.84518 12.2913 2.5C12.2913 2.15482 12.0115 1.875 11.6663 1.875H8.33301C7.98783 
                                        1.875 7.70801 2.15482 7.70801 2.5C7.70801 2.84518 7.98783 3.125 8.33301 3.125L11.6663 3.125Z" fill="#AFAFAF"></path><path
                                            d="M17.2913 5C17.2913 5.34518 17.0115 5.625 16.6663 5.625L3.33301 5.625C2.98783 5.625 2.70801 5.34518 2.70801 5C2.70801 4.65482 
                                        2.98783 4.375 3.33301 4.375L16.6663 4.375C17.0115 4.375 17.2913 4.65482 17.2913 5Z" fill="#AFAFAF"></path><path d="M4.99967 
                                        7.70833C5.34485 7.70833 5.62467 7.98816 5.62467 8.33333V15.8333C5.62467 16.4086 6.09104 16.875 6.66634 16.875H13.333C13.9083 
                                        16.875 14.3747 16.4086 14.3747 15.8333V8.33333C14.3747 7.98816 14.6545 7.70833 14.9997 7.70833C15.3449 7.70833 15.6247 7.98816 
                                        15.6247 8.33333V15.8333C15.6247 17.099 14.5987 18.125 13.333 18.125H6.66634C5.40069 18.125 4.37467 17.099 4.37467 15.8333V8.33333C4.37467 
                                        7.98816 4.6545 7.70833 4.99967 7.70833Z" fill="#AFAFAF"></path><path d="M8.33301 9.375C8.67819 9.375 8.95801 9.65482 8.95801 
                                        10V14.1667C8.95801 14.5118 8.67819 14.7917 8.33301 14.7917C7.98783 14.7917 7.70801 14.5118 7.70801 14.1667V10C7.70801 9.65482 7.98783 
                                        9.375 8.33301 9.375Z" fill="#AFAFAF"></path><path d="M12.2913 10C12.2913 9.65482 12.0115 9.375 11.6663 9.375C11.3212 9.375 11.0413 
                                        9.65482 11.0413 10V14.1667C11.0413 14.5118 11.3212 14.7917 11.6663 14.7917C12.0115 14.7917 12.2913 14.5118 12.2913 14.1667V10Z"
                                            fill="#AFAFAF"></path></svg></button>
                            </div>
                        );
                    })}
                    <div className="hidden md:block">
                        <div className="flex flex-col mt-5">
                            {isPromoCode ? <div className="flex flex-row">
                                <p className="text-gray-600 text-2xl font-bold mb-2">Общая сумма: <span className="text-orange-400 text-2xl font-bold">{total} ₽</span></p>
                                <p className="text-gray-600 text-2xl font-bold">Ваша скидка: <span className="text-orange-400 text-2xl font-bold">{newPrice} ₽</span></p>
                            </div>
                                : <p className=" text-2xl text-gray-600 font-bold">Общая сумма: <span className="text-orange-400 text-2xl font-bold">{subTotal} ₽</span></p>}
                        </div>
                    </div>

                    <div className="block md:hidden">
                        <div className="flex flex-col mt-5">
                            {isPromoCode ? <div className="text-left">
                                <p className="text-gray-600 text-2xl font-bold mb-2">Общая сумма: <span className="text-orange-400 text-2xl font-bold">{total} ₽</span></p>
                                <p className="text-gray-600 text-2xl font-bold">Ваша скидка: <span className="text-orange-400 text-2xl font-bold">{newPrice} ₽</span></p>
                            </div>
                                : <p className=" text-2xl text-gray-600 font-bold">Общая сумма: <span className="text-orange-400 text-2xl font-bold">{subTotal} ₽</span></p>}
                        </div>
                    </div>

                </div>
            )}
            {/* Промокоды */}
            <div className="mt-10">
                <h4 className="text-4xl text-gray-600">Промокод</h4>
                <div className="mt-5 mb-1 flex flex-col">
                    <input className="mb-5 pl-5 pr-5 pt-2 pb-2 rounded-2xl dont_close" type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Введите промокод" />
                    <button className="m-1 p-3 w-full rounded-2xl cursor-pointer text-gray-600 bg-gray-100  hover:bg-gray-200"
                        onClick={() => handleApplaePromo()}>Применить промокод</button>
                </div>
            </div>
            <div>
                <button className="m-1 p-3 w-full rounded-2xl cursor-pointer text-gray-600 bg-gray-100  hover:bg-gray-200" onClick={() => cleaningShoppingCart()}>Очистить корзину</button>
            </div>
        </div>
    );
};
export default ShoppingCart