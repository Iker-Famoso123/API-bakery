import pg from 'pg'
const { Pool } = pg

import { config } from '../../config/config.js'

// Configuración de conexion
const pool = new Pool({
    user: config.db.user,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port,
    ssl: {
        rejectUnauthorized: false, // Opción para evitar errores de certificado no confiable (NO RECOMENDADO para producción)
    },
})

const now = new Date()
const currentYear = now.getFullYear()
const url = `https://date.nager.at/api/v3/publicholidays/${currentYear}/MX`

const insertHolidays = async (holidays) => {
    
    const query = 'INSERT INTO Holidays (date, description) VALUES ($1, $2)'
    
    const client = await pool.connect()
    try {
        for (const holiday of holidays) {
            const { name, date } = holiday
            await client.query(query, [date, name])
        }
    } finally {
        client.release()
    }

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