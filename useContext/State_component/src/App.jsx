import './App.css'
import Categories from './components/categories/Categories';
import FormAddCategory from './components/formAddCategory/formAddCategory';


function App() {

  return (
    <div className='container'>

      <FormAddCategory />

      <Categories />
    </div>
  )
}

export default App
