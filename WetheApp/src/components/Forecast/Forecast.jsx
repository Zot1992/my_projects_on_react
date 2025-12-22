import { ForecastItem } from "../ForecastItem/ForecastItem"

export const Forecast = ({ data, units }) => {

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Прогноз на 5 дней</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {data.map((forecastItem, index) => (
                    <div key={index} className="forecast">
                        <ForecastItem data={forecastItem}
                            units={units} />
                    </div>
                ))}
            </div>
        </div>
    )
}