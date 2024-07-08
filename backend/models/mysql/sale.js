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

            const query = `INSERT INTO Weather 
                (local_observation_datetime, weather_text, temperature_metric_value, 
                realfeel_temperature_metric_value, relative_humidity, wind_speed_metric_value, 
                has_precipitation, precipitation_summary_past24hours_metric_value, 
                cloud_cover, visibility_metric_value) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

            const values = [
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

            try {

                const [result] = await connection.query(query, values);
            
                console.log('Weather data saved successfully:', result);
                
                const insertId = result.insertId;
                console.log('Inserted row ID:', insertId);
                

            } catch (e) {
                throw new Error('Error inserting weather data into the db') 
            }

        } catch (error) {
            console.error('Error fetching weather data: ', error)
        }

    }

    static async delete({ id }) {
        console.log('delete')

    }

    static async update({ id, input }) {
        console.log('update')

    }
}