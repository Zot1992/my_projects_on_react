import { useState, useEffect } from 'react'
import './App.css'
import.meta.env.VITE_API_KEY
import { SearchBar } from './components/SearchBar/SearchBar'
import { SearchHistory } from './components/SearchHistory/SearchHistory'
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage'
import { Loader } from './components/Loader/Loader'
import { CurrentWeather } from './components/CurrentWeather/CurrentWeather'
import { Forecast } from './components/Forecast/Forecast'
import { getCurrentWethe, getCallfiveDays } from '../Servises/wetherApi';
import { getSearchHistory, addSearchHistory } from '../utils/localStorage'
import { getUnits, setUnits } from '../utils/localStorage'

function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [fiveDaysWeatherData, setFiveDaysWeatherData] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState(null);
  const [units, setUnitsState] = useState(() => getUnits());
  const [celsius, setCelsius] = useState(true);
  const [fahrenheit, setFahrenheit] = useState(false);


  useEffect(() => {  //Создана отдельная функция внутри useEffect для того что бы не ругался ESLint
    const loadLastCity = async () => {
      const history = getSearchHistory();
      if (history.length > 0) {
        handleSearch(history[0]);
      }
    };

    loadLastCity();
  }, []);


  async function handleSearch(city) { //Функция для загрузки данных
    try {
      setLoading(true);
      setErrors(null)
      const data = await getCurrentWethe(city);
      const fiveDaysData = await getCallfiveDays(city);
      setWeatherData(data);
      setFiveDaysWeatherData(fiveDaysData);
    } catch (err) {
      setErrors(err.message)
    } finally {
      setLoading(false);
      addSearchHistory(city);
      setHistory(getSearchHistory());
    }
  }

  const handleCityFromHistory = (city) => {
    handleSearch(city);
  }

  const handleUnitsChange = (newUnits) => {
    setUnitsState(newUnits);
    setUnits(newUnits);
  }

  const visitCelsius = () => {
    setCelsius(true);
    setFahrenheit(false);
  }

  const visitFahrenheit = () => {
    setCelsius(false);
    setFahrenheit(true);
  }

  return (
    <div className='min-h-screen bg-gray-100 py-8'>
      <div className='max-w-5xl mx-auto px-4'>
        <header className='text-center mb-6'>
          <h1 className='text-3xl mb-3'>Прогноз погоды</h1>
          <SearchBar
            onSearch={handleSearch}
            changeErrors={setErrors}
          />
        </header>
        {error && (<ErrorMessage error={error} />)}

        {loading && (<Loader loading={loading} />)}

        {!weatherData && !loading && !error && (
          <div className="text-center">
            <h2 className='text-2xl'>🌤️ Добро пожаловать в приложение «Погода»!</h2>
            <p>Введите название города, чтобы получить текущую погоду и прогноз на 5 дней.</p>
          </div>
        )}

        {weatherData && !loading && !error && (
          <div>
            <CurrentWeather className='current-weather' data={weatherData}
              units={units} />

            {fiveDaysWeatherData && fiveDaysWeatherData.length > 0 && (
              <Forecast className='forecast' data={fiveDaysWeatherData}
                units={units} />
            )}

            <div className="flex justify-center gap-2 m-5">
              <button
                className={` px-3 py-1 bg-gray-200 border-2 border-transparent rounded-2xl text-gray-600 text-sm font-semibold cursor-pointer transition-all duration-300 
    hover:bg-blue-500 hover:text-white hover:border-blue-500 ${celsius && 'bg-gray-400 hover:bg-gray-300'}`}
                onClick={() => (handleUnitsChange('celsius'), visitCelsius())}
              >°C</button>

              <button
                className={`px-2.5 py-1 bg-gray-200 border-2 border-transparent rounded-2xl text-gray-600 text-sm font-semibold cursor-pointer transition-all duration-300 
    hover:bg-blue-500 hover:text-white hover:border-blue-500 ${fahrenheit && 'bg-gray-400 hover:bg-gray-300'}`}
                onClick={() => (handleUnitsChange('fahrenheit'), visitFahrenheit())}
              >°F</button>
            </div>
          </div>
        )}

        <div>
          <SearchHistory
            history={history}
            onCityClick={handleCityFromHistory}
            changingHistory={setHistory}
          />
        </div>
      </div>
    </div>
  )
}

export default App
