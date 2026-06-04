import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios";

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://server.blasars.ru/api/categories')
      .then((response) => {
        console.log(response.data);
        setData(response.data.body);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? <p>Загрузка...</p>
        : (Array.isArray(data) && data.length > 0 && (
          < div >
            {
              data.map(item => (
                <p key={item.id}>{item.name}</p>
              ))
            }
          </div>)
        )
      }
    </div >
  )
}

export default App
