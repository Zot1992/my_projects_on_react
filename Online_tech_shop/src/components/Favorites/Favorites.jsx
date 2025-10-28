import { useState, useEffect } from "react";

const Favorites = ({ favoriteItems = [], removeFromFavorite, openCart, onAddToCart, cleaningFavorites }) => {

    const [subTotal, setSubTotal] = useState(0);

    // Функция для подсчета общей суммы
    useEffect(() => {
        const calculateTotal = () => {
            const total = favoriteItems.reduce((acc, item) => {
                return acc + item.product.price;
            }, 0);
            setSubTotal(total);
        };

        calculateTotal();
    }, [favoriteItems]);

    return (
        <div data-testid="favorites-modal">
            <h1 data-testid="favorites-modal-title" className="text-5xl text-gray-600 mb-5">Избранное</h1>
            {favoriteItems.length === 0 ? (
                <p>В списке пока нет ни одного избранного товара</p>
            ) : (
                <div>
                    {favoriteItems.map(item => {
                        return (
                            <div key={item.id} className="remove-button flex flex-col items-center mt-2 bg-gray-50 rounded-2xl shadow-md p-4 hover:shadow-lg focus:outline-none focus:shadow-outline first:mt-0 last:mb-0">
                                <img src={item.image} alt={`Изображение ${item.product.name}`} className="w-40 h-40 object-cover" />
                                <p className="text-2xl text-gray-600">{item.product.name}</p>
                                <p className="text-orange-400 text-2xl font-bold">{item.product.price} ₽</p>
                                <div className="flex">
                                    {/* Кнопка удаления*/}
                                    <button className="m-1 p-5 rounded-2xl cursor-pointer bg-gray-100  hover:bg-gray-200"
                                        onClick={() => removeFromFavorite(item.id)}>
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
                                    {/* Кнопка добавления в корзину */}
                                    <button className="m-1 p-5 rounded-2xl cursor-pointer bg-gray-100  hover:bg-gray-200"
                                        onClick={() => onAddToCart(item.product, 1)}>
                                        <svg data-v-1090b266="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path data-v-1090b266="" fillRule="evenodd" clipRule="evenodd"
                                                d="M2.25 3C2.25 2.58579 2.58579 2.25 3 2.25H4.38197C5.04482 2.25 5.65078 2.6245 5.94721 3.21738L5.27639 3.55279L5.94721 3.21738L6.46353 4.25H20.1384C21.0982
                         4.25 21.6999 5.28685 21.2237 6.12017L17.9391 11.8682C17.6275 12.4135 17.0477 12.75 16.4197 12.75H8.91567L7.59225 14.8675C7.48818 15.034 7.60789 15.25 
                         7.80425 15.25H19C19.4142 15.25 19.75 15.5858 19.75 16C19.75 16.4142 19.4142 16.75 19 16.75H7.80425C6.42974 16.75 5.59176 15.2381 6.32025 14.0725L7.67159
                          11.9103L5.30898 5.295L4.60557 3.8882C4.56322 3.8035 4.47666 3.75 4.38197 3.75H3C2.58579 3.75 2.25 3.41421 2.25 3ZM7.06427 5.75L9.02855 
                          11.25H16.4197C16.5094 11.25 16.5922 11.2019 16.6368 11.124L19.7076 5.75H7.06427ZM10 19.5C10 20.3284 9.32843 21 8.5 21C7.67157 21 7 20.3284 7 
                          19.5C7 18.6716 7.67157 18 8.5 18C9.32843 18 10 18.6716 10 19.5ZM17.5 21C18.3284 21 19 20.3284 19 19.5C19 18.6716 18.3284 18 17.5 18C16.6716 18 16
                           18.6716 16 19.5C16 20.3284 16.6716 21 17.5 21Z" fill="#AFAFAF"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    <div className="flex flex-col mt-5">
                        <p className=" text-2xl text-gray-600 font-bold">Общая сумма: <span className="text-orange-400 text-2xl font-bold">{subTotal} ₽</span></p>
                    </div>
                    <div className="flex flex-col mt-2">
                        <button className="m-1 p-3 rounded-2xl cursor-pointer text-gray-600 bg-gray-100  hover:bg-gray-200"
                            onClick={openCart}>Перейти в корзину</button>
                        <button className="remove-button m-1 p-3 rounded-2xl cursor-pointer text-gray-600 bg-gray-100  hover:bg-gray-200"
                            onClick={cleaningFavorites}>Очистить избранное</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Favorites