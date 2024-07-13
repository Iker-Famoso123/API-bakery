import pg from 'pg'
const { Pool } = pg
import { fetchWeatherData, calculateTotalValue } from '../../../utils/utils.js'
import { config } from '../../../config/config.js'
import { insertSaleDetails } from './saleDetails.js'
import { insertWeatherData } from '../weather.js'
import { insertSaleData } from './saleData.js'

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
        const client = await pool.connect()
        try {
            const weatherData = await fetchWeatherData()
            const weatherId = await insertWeatherData(client, weatherData)
    
            const filteredItems = Object.entries(input)
                .filter(([key, value]) => value > 0)
                .map(([key, value]) => ({ name: key, quantity: value }))
    
            const totalValue = calculateTotalValue(filteredItems)
    
            const now = new Date()
            now.setHours(now.getHours() - 6)
            const dateTime = now.toISOString().slice(0, 19).replace('T', ' ')
    
            const options = { weekday: 'long' }
            const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(new Date())
    
            const currentDate = new Date().toISOString().split('T')[0]
            const queryHolidays = 'SELECT * FROM Holidays WHERE date = ?'
            const [checkIsHoliday] = await connection.execute(queryHolidays, [currentDate])
            const isHoliday = checkIsHoliday.length > 0
    
            const saleId = await insertSaleData(client, dateTime, weatherId, dayOfWeek, isHoliday, totalValue)
    
            await insertSaleDetails(client, saleId, filteredItems)

            return 
    
        } catch (error) {
            console.error('Error creating sale:', error)
        } finally {
            client.release()
        }
    }

    static async delete({ id }) {
        console.log('delete')

    }

    static async update({ id, input }) {
        console.log('update')

    }
}