import './App.css'
import FormAddCategory from './components/FormAddCategory/FormAddCategory'
import Categories from './components/Categories/Categories'
import FormUpdateCategory from './components/FormUpdateCategory/FormUpdateCategory'
import { useSelector } from 'react-redux'

function App() {

  const isUpdate = useSelector(state => state.categories.isUpdate)

  return (
    <>
      <FormAddCategory />
      {isUpdate && <FormUpdateCategory />}
      <Categories />
    </>
  )
}

export default App
