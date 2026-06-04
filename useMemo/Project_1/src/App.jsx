import './App.css'
import Form from './components/Form'
import Items from './components/Items'

function App() {


  return (
    <>
      <div className='container'>
        <h2>Список пользователей</h2>
        <Form />
        <Items />
      </div>
    </>
  )
}

export default App
