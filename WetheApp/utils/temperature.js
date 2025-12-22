export function convertTemp(celsius, units) {

    if (units === 'fahrenheit') {
        return Math.round((celsius * 9 / 5) + 32)
    }

    return Math.round(celsius)
}

export const getTempSymbol = units => units === 'fahrenheit' ? '°F' : '°C';

