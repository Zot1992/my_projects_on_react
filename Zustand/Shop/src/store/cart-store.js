import { create } from "zustand";
import { products } from "./bd";


const useCart = create((set) => {

    return {
        arrayCart: [],

        addToCart: (id) => {
            const prod = products.find(prod => prod.id === id);

            if (!prod) return

            set((state) => {
                if (state.arrayCart.length !== 0) {
                    const checkProd = state.arrayCart.find(prod => prod.id === id)

                    if (checkProd) {
                        alert('Такой товар уже есть в корзине!')
                        return state
                    }
                }

                const newCartItem = {
                    id: prod.id,
                    image: prod.image,
                    title: prod.title,
                    price: prod.price
                }

                return {
                    arrayCart: [...state.arrayCart, newCartItem]
                }
            })
        },

        deleteFromCart: (id) => {

            if (!confirm('Вы действительно хотите удалить товар?')) return;

            set((state) => {
                const newCart = state.arrayCart.filter(prod => prod.id !== id);

                return {
                    arrayCart: newCart
                }
            })
        }
    }

})


export default useCart