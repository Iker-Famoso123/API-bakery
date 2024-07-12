import express, { json } from 'express'
import { salesRouter } from  './backend/routes/sales.js'
import { corsMiddleware } from './backend/middlewares/cors.js'

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/sales', salesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})