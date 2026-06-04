import './App.css'
import Form from './components/Form'
import { Bounce, ToastContainer } from 'react-toastify'

function App() {


  return (
    <>
      <div className='container'>
        <Form />

        <ToastContainer className="custom-toast-container"
          position='top-right'
          autoClose={5000}
          closeButton={true}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          stacked={false}
          draggable={true}
          pauseOnHover={true}
          theme='light'
          transition={Bounce}
          limit={4}
          icon={true}
          rtl={false}
        />
      </div>

    </>
  )
}

export default App
