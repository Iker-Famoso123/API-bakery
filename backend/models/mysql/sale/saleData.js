export const insertSaleData = async (connection, dateTime, weatherId, dayOfWeek, isHoliday, totalValue) => {
    try {
        const querySaleData = `INSERT INTO Sales (date_time, id_weather, day_of_week, is_holiday, total) 
            VALUES(?, ?, ?, ?, ?)`;

        const valuesSaleData = [
            dateTime,
            weatherId,
            dayOfWeek,
            isHoliday,
            totalValue
        ];

        const [resultSale] = await connection.query(querySaleData, valuesSaleData);
        console.log('Sale inserted successfully:', resultSale);

        return resultSale.insertId;
    } catch (error) {
        console.error('Error inserting sale data:', error);
        throw error;
    }
}


