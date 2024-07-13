export const insertWeatherData = async (client, weatherData) => {
    try {
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

        const queryWeatherData = `INSERT INTO Weather 
            (local_observation_datetime, weather_text, temperature_metric_value, 
            realfeel_temperature_metric_value, relative_humidity, wind_speed_metric_value, 
            has_precipitation, precipitation_summary_past24hours_metric_value, 
            cloud_cover, visibility_metric_value) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id_weather`;

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

        const resultWeather = await client.query(queryWeatherData, valuesWeatherData);
        console.log('Weather data saved successfully:', resultWeather.rows[0]);

        return resultWeather.rows[0].id_weather;
    } catch (error) {
        console.error('Error inserting weather data:', error);
        throw error;
    }
}

