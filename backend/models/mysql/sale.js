import mysql from 'mysql2/promise'
import { fetchWeatherData } from '../../utils/utils.js'
import { config } from '../../config/config.js'


const connection = await mysql.createConnection(config.db)

export class SalesModel {

    static async getAll() {
        console.log('getAll')
        const [sales] = await connection.query('SELECT * FROM sales')
        return sales
    }

    static async getById({ id }) {
        console.log('getById')

    }

    static async create({ input }) {
        // console.log('create')
        try {
            const weatherData = await fetchWeatherData()

            const {
                LocalObservationDateTime,
                WeatherText,
                Temperature,
                RealFeelTemperature,
                RelativeHumidity,
                Wind,
                HasPrecipitation,
                PrecipitationSummary,
                CloudCover,
                Visibility

            } = weatherData[0]

            const date = new Date(LocalObservationDateTime)
            const formattedDateTime = date.toISOString().slice(0, 19).replace('T', ' ')

            const queryWeatherData = `INSERT INTO Weather 
                (local_observation_datetime, weather_text, temperature_metric_value, 
                realfeel_temperature_metric_value, relative_humidity, wind_speed_metric_value, 
                has_precipitation, precipitation_summary_past24hours_metric_value, 
                cloud_cover, visibility_metric_value) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

            const valuesWeatherData = [
                formattedDateTime,
                WeatherText,
                Temperature.Metric.Value,
                RealFeelTemperature.Metric.Value,
                RelativeHumidity,
                Wind.Speed.Metric.Value,
                HasPrecipitation,
                PrecipitationSummary.Past24Hours.Metric.Value,
                CloudCover,
                Visibility.Metric.Value
            ];



            const [resultWeather] = await connection.query(queryWeatherData, valuesWeatherData);

            console.log('Weather data saved successfully:', resultWeather);

            const insertId = resultWeather.insertId;

            // Filtrar y almacenar en un array los elementos con valor > 0
            const filteredItems = Object.entries(input)
            .filter(([key, value]) => value > 0)
            .map(([key, value]) => ({ name: key, quantity: value }));

            let totalValue = 0

            filteredItems.forEach(item => {
                if (item.name === 'nidos' || item.name === 'estrellitas' || item.name === 'rollitos') {
                    totalValue += item.quantity * 6
                } else if (item.name === 'donitas') {
                    totalValue += item.quantity * 8
                } else {
                    totalValue += item.quantity * 12
                }
                
            })

            console.log("totalValue: ", totalValue);

            // Obtener la fecha y hora actual 
            const now = new Date();

            // Restar 6 horas a la fecha y hora actual
            now.setHours(now.getHours() - 6);

            // Formatear la fecha y hora en formato MySQL DATETIME
            const date_time = now.toISOString().slice(0, 19).replace('T', ' ');

            // Obtener el día de la semana 
            const options = { weekday: 'long' };
            const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(new Date());

            const dateHoliday = new Date()
            const currentDate = dateHoliday.toISOString().split('T')[0]
            console.log('currentDate: ', currentDate)

            const queryHolidays = 'SELECT * FROM Holidays WHERE date = ?'
            const [checkIsHoliday] = await connection.execute(queryHolidays, [currentDate])
            const isHoliday = checkIsHoliday.length > 0


            const querySaleData = `INSERT INTO Sales (date_time, id_weather, day_of_week, is_holiday, total) 
            VALUES(?, ?, ?, ?, ?)`

            const valuesSaleData = [
                date_time,
                insertId,
                dayOfWeek,
                isHoliday,
                totalValue
            ]


            const [resultSale] = await connection.query(querySaleData, valuesSaleData)

            console.log('Sale inserted successfully: ', resultSale)



        } catch (error) {
            console.error('Error fetching weather data: ', error)
            return
        }

    }

    static async delete({ id }) {
        console.log('delete')

    }

    static async update({ id, input }) {
        console.log('update')

    }
}