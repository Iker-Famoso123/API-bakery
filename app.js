import express, { json } from 'express'
import { breadsRouter } from  './backend/routes/breads.js'

const app = express()
app.use(json())
app.disable('x-powered-by')

app.use('/breads', breadsRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})