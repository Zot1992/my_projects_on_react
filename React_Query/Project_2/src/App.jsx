import './App.css'
import FormCreateCategory from './components/FormCreateCategory'
import UpdateCategory from './components/UpdateCategory'
import Categories from './components/Categories'
import { useContext } from 'react'
import { idContext } from './context/idContext'


function App() {

  const { id } = useContext(idContext);

  return (
    <>
      <FormCreateCategory />
      {id && <UpdateCategory id={id} />}
      <Categories />
    </>
  )
}

export default App
