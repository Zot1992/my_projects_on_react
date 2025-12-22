import { convertTemp, getTempSymbol } from "../../../utils/temperature";

export const ForecastItem = ({ data, units }) => {
    // Получаем день недели и дату
    const date = new Date(data.dt * 1000); // Преобразуем timestamp в миллисекунды
    const dayName = date.toLocaleDateString('ru-RU', { weekday: 'short' }); // Например, "Пн", "Вт"
    const dayDate = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }); // Например, "15 янв"

    const iconCode = data?.weather?.[0]?.icon;
    const iconUrl = iconCode
        ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
        : null;

    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[180px]">
            {/* Дата */}
            <div className="text-center mb-2">
                <div className="font-semibold text-gray-800">{dayName}</div>
                <div className="text-sm text-gray-600">{dayDate}</div>
            </div>

            {/* Иконка погоды */}
            <div className="my-2">
                {iconUrl ? (
                    <img
                        src={iconUrl}
                        alt={data?.weather?.[0]?.description || 'погода'}
                        className="w-16 h-16 object-contain"
                    />
                ) : (
                    <span className="text-gray-500">-</span>
                )}
            </div>

            {/* Описание погоды */}
            <div className="text-sm text-gray-700 capitalize mb-2 text-center">
                {data?.weather?.[0]?.description || ''}
            </div>

            {/* Температура */}
            <div className="flex flex-col space-y-1 w-full">
                <div className="flex justify-between text-gray-800 font-medium">
                    <span className="text-red-600">
                        {data?.main?.temp_max ? convertTemp(data.main.temp_max, units) + getTempSymbol(units) + '°' : '--°'}
                    </span>
                    <span className="text-blue-600">
                        {data?.main?.temp_min ? convertTemp(data.main.temp_min, units) + getTempSymbol(units) + '°' : '--°'}
                    </span>
                </div>
            </div>

            {/* Влажность */}
            <div className="text-xs text-gray-600 mt-2">
                Влажность: {data?.main?.humidity || '--'}%
            </div>

            <div className="text-xs text-gray-600 mt-2">
                Скорость ветра: {data?.wind?.speed || '--'} м/с
            </div>
        </div>
    );
};