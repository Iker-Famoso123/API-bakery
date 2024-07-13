export const insertSaleData = async (client, dateTime, weatherId, dayOfWeek, isHoliday, totalValue) => {
    try {
        const querySaleData = `INSERT INTO Sales (date_time, id_weather, day_of_week, is_holiday, total) 
            VALUES($1, $2, $3, $4, $5) RETURNING id_sale`;

        const valuesSaleData = [
            dateTime,
            weatherId,
            dayOfWeek,
            isHoliday,
            totalValue
        ];

        const resultSale = await client.query(querySaleData, valuesSaleData);
        console.log('Sale inserted successfully:', resultSale.rows[0]);

        return resultSale.rows[0].id_sale;
    } catch (error) {
        console.error('Error inserting sale data:', error);
        throw error;
    }
}


