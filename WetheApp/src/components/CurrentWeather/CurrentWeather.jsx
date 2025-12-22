import { convertTemp, getTempSymbol } from "../../../utils/temperature";


export const CurrentWeather = ({ data, units }) => {

    const { name, sys, main, weather, wind } = data; //Деструктуризация
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    return (
        <div className="current-weather bg-white p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] mb-8">
            <div className="location mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-400">{name}, {sys.country}</h2>
            </div>

            <div className="temperature-section flex flex-col items-center justify-center gap-8 mb-8">
                <img src={iconUrl} alt={weather[0].description} className="weather-icon w-24 h-24" />
                <div className="temp text-6xl font-bold text-gray-400">{convertTemp(main.temp, units)}{getTempSymbol(units)}</div>
            </div>

            <div className="description text-center mb-8 text-lg text-gray-600 capitalize">
                {weather[0].description}
            </div>

            <div className="details grid grid-cols-2 gap-8 mt-8">

                <div className="detail-item bg-gray-100 p-4 rounded-md flex flex-col gap-2">
                    <span className="text-gray-600 text-base">
                        Ощущается как:
                    </span>
                    <strong className="text-2xl text-gray-400">
                        {convertTemp(main.feels_like, units)}{getTempSymbol(units)}
                    </strong>
                </div>


                <div className="detail-item bg-gray-100 p-4 rounded-md flex flex-col gap-2">
                    <span className="text-gray-600 text-base">
                        Влажность:
                    </span>
                    <strong className="text-2xl text-gray-400">
                        {main.humidity}%
                    </strong>
                </div>


                <div className="detail-item bg-gray-100 p-4 rounded-md flex flex-col gap-2">
                    <span className="text-gray-600 text-base">
                        Ветер:
                    </span>
                    <strong className="text-2xl text-gray-400">
                        {wind.speed} м/с
                    </strong>
                </div>


                <div className="detail-item bg-gray-100 p-4 rounded-md flex flex-col gap-2">
                    <span className="text-gray-600 text-base">
                        Давление:
                    </span>
                    <strong className="text-2xl text-gray-400">
                        {main.pressure} гПа
                    </strong>
                </div>
            </div>
        </div>
    )
}