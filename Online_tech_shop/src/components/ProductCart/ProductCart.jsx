import { useState } from "react";

const ProductCart = ({ product, onAddToCart, onToggleFavorite }) => {

    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const handleIncrement = () => {
        if (quantity < product.inStock) {
            setQuantity(quantity + 1);
        }
    }

    return (
        <div className="flex flex-col items-center mt-2 ml-2 mb-2 bg-white rounded-2xl shadow-md p-4 hover:shadow-lg focus:outline-none focus:shadow-outline first:mt-0 last:mb-0">
            <img src={product.image} alt={`Изображение ${product.name}`} className="w-80 h-80 object-cover" />
            <div>
                <h3 className="text-3xl text-gray-600">{product.name}</h3>
                <span className=" text-orange-400 font-bold text-[25px]">{product.price} ₽</span>
                <p className="text-gray-600">В наличии:{product.inStock}шт.</p>
                <p className="text-gray-600">Количество: {quantity}</p>
                <div className="flex items-center justify-center">
                    <button className="m-1 pt-4 pb-4 pl-7 pr-7 rounded-2xl cursor-pointer bg-gray-100 text-gray-400 text-2xl hover:bg-gray-200" onClick={handleDecrement}>-</button>
                    <button className="m-1 pt-4 pb-4 pl-6 pr-6 rounded-2xl cursor-pointer bg-gray-100 text-gray-400 text-2xl hover:bg-gray-200" onClick={handleIncrement}>+</button>
                    <button className="m-1 p-5 rounded-2xl cursor-pointer bg-gray-100  hover:bg-gray-200"
                        onClick={() => onAddToCart(product, quantity)}>
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
                    <button className="m-1 p-5 rounded-2xl cursor-pointer bg-gray-100  hover:bg-gray-200"
                        onClick={() => onToggleFavorite(product)}><svg width="22" height="22" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.25 6.36912C0.25 3.07041 2.65767 0.25 5.79925 0.25C7.49913 0.25 8.99404 1.08608 10 2.36847C11.0059 1.08613 12.5006 0.25 14.1996 0.25C17.3423 0.25 
                    19.75 3.07167 19.75 6.36912C19.75 7.69532 19.2489 8.97129 18.5251 10.1284C17.7997 11.2883 16.8229 12.3733 15.8015 13.3326C13.7592 15.2508 11.4589 16.7397 
                    10.3901 17.3906C10.1504 17.5365 9.84927 17.5365 9.60965 17.3904C8.54109 16.7391 6.24079 15.2501 4.19851 13.3322C3.17709 12.3729 2.20033 11.288 1.47488 
                    10.1283C0.751138 8.97123 0.25 7.69533 0.25 6.36912ZM5.79925 1.75C3.63983 1.75 1.75 3.73625 1.75 6.36912C1.75 7.31789 2.11117 8.31698 2.74658 9.33278C3.38027
                     10.3458 4.25947 11.3316 5.22537 12.2387C6.94066 13.8496 8.86662 15.1546 10.0001 15.8678C11.1335 15.1552 13.0594 13.8502 14.7746 12.2392C15.7405 11.3321 
                     16.6197 10.3462 17.2534 9.33299C17.8888 8.31707 18.25 7.3179 18.25 6.36912C18.25 3.73751 16.3602 1.75 14.1996 1.75C12.7203 1.75 11.3843 2.66549 10.6719 
                     4.10155C10.5452 4.35679 10.2849 4.51824 10 4.51824C9.71508 4.51824 9.45476 4.35679 9.32813 4.10155C8.61575 2.66559 7.2798 1.75 5.79925 1.75Z"
                            fill="#AFAFAF"></path></svg></button>
                </div>
            </div>
        </div>
    )


}

export default ProductCart