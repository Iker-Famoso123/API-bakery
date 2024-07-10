import { fetchWeatherData } from '../../utils/utils.js';
import { config } from '../../config/config.js';
import pg from 'pg';

const { Pool } = pg;


// Configuración de conexión para PostgreSQL
const pool = new Pool({
    user: config.db.user,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port,
    ssl: {
        rejectUnauthorized: false, // Opción para evitar errores de certificado no confiable (NO RECOMENDADO para producción)
    },
});

export class SalesModel {

    static async getAll() {
        console.log('getAll');
        const client = await pool.connect();
        try {
            const result = await client.query('SELECT * FROM sales');
            return result.rows;
        } finally {
            client.release();
        }
    }

    static async getById({ id }) {
        console.log('getById');
        // Implementar lógica para obtener por ID
    }

    static async create({ input }) {
        try {
            const weatherData = await fetchWeatherData();

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
            } = weatherData[0];

            const date = new Date(LocalObservationDateTime);
            const formattedDateTime = date.toISOString().slice(0, 19).replace('T', ' ');

            const query = `INSERT INTO Weather 
                (local_observation_datetime, weather_text, temperature_metric_value, 
                realfeel_temperature_metric_value, relative_humidity, wind_speed_metric_value, 
                has_precipitation, precipitation_summary_past24hours_metric_value, 
                cloud_cover, visibility_metric_value) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;

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

            console.log("Presipitacion:", HasPrecipitation)

            const client = await pool.connect();
            try {
                const result = await client.query(query, values);
                console.log('Weather data saved successfully:', result.rows);
            } finally {
                client.release();
            }

        } catch (error) {
            console.error('Error inserting weather data into the db:', error);
            throw new Error('Error inserting weather data into the db');
        }
    }

    static async delete({ id }) {
        console.log('delete');
        // Implementar lógica para eliminar por ID
    }

    static async update({ id, input }) {
        console.log('update');
        // Implementar lógica para actualizar por ID
    }
}
