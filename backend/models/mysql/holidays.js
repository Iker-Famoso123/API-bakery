import mysql from 'mysql2/promise'
import { config } from '../../config/config.js'


const now = new Date()
const currentYear = now.getFullYear()
const url = `https://date.nager.at/api/v3/publicholidays/${currentYear}/MX`

async function insertHolidays(holidays) {
    const connection = await mysql.createConnection(config.db)

    const query = 'INSERT INTO Holidays (date, description) VALUES (?, ?)'

    for (const holiday of holidays) {
        const { name, date} = holiday
        await connection.execute(query, [date, name])   
    }

    await connection.end()
}

const getHolidaysPerYear = () => {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Holidays response was not ok')
            }
            return response.json()
        })
        .then(data => {
            if (Array.isArray(data)) {
                const holidays = data.map(holiday => ({
                    name: holiday.name,
                    date: holiday.date
                }))
                
                // console.log('Holidays: ', holidays)

                insertHolidays(holidays)
                    .then(() => console.log('Holidays inserted in the db.'))
                    .catch(error => console.error('Error while insert in the db: ', error))

            } else {
                console.error('Holidays were not found in the response.')
            }


        })
        .catch(error => console.error('Error: ', error))
}

getHolidaysPerYear()

