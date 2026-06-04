import './App.css'
import From from './components/Form'
import Tasks from './components/Tasks'
import Form_update from './components/Form_update'
import { useSelector } from 'react-redux'

function App() {

  const isUpdate = useSelector(state => state.tasks.isUpdate);

  return (
    <>
      <From />
      {isUpdate && <Form_update />}
      <Tasks />
    </>
  )
}

export default App
