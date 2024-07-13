import axios from 'axios'
import { config } from '../config/config.js'

export const fetchWeatherData = async () => {
    try {
        const response = await axios.get(config.weatherApi.url, {
            params: {
                apikey: config.weatherApi.apiKey,
                details: config.weatherApi.details,
                language: config.weatherApi.language
            }
        })

        if (response.status === 200) {
            const weatherData = response.data
            return weatherData
        } else {
            return []
        }

    } catch (error) {
        console.log('Error fetching weather data: ', error)
    }
}

export const calculateTotalValue = (filteredItems) => {
    let totalValue = 0;

    filteredItems.forEach(item => {
        if (item.name === 'nidos' || item.name === 'estrellitas' || item.name === 'rollitos') {
            totalValue += item.quantity * 6;
        } else if (item.name === 'donitas') {
            totalValue += item.quantity * 8;
        } else {
            totalValue += item.quantity * 12;
        }
    });

    console.log("totalValue: ", totalValue);
    return totalValue;
}
