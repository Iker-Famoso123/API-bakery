import express, { json } from 'express'
import { salesRouter } from  './backend/routes/sales.js'

const app = express()
app.use(json())
app.disable('x-powered-by')

app.use('/sales', salesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})