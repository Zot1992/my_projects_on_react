import './App.css'
import Shopping_cart from './componiens/Shopping_cart.jsx'
import Categories from './componiens/Categories.jsx'
import Goods_counter from './componiens/Goods_counter.jsx'
import { useState } from 'react'

function App() {

  const [isShopping_cart, setIsShopping_cart] = useState(false);

  return (
    <>
      <header className='header container content-center row'>
        <h1>Shop</h1>

        <div className='cart_content'>

          <div className='buttonCart' onClick={() => setIsShopping_cart(!isShopping_cart)}>
            <img className='buttonCart_Icon' src={isShopping_cart ? "/src/img/free-icon-close-151882.png" : "/src/img/free-icon-basket-7087821.png"} alt="" />
            <Goods_counter />
          </div>

          {isShopping_cart && <Shopping_cart />}
        </div>

      </header>

      <main className='container content-center'>
        <Categories />
      </main>
    </>
  )
}

export default App
