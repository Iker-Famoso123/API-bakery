const express = require('express')

const PORT = process.env.PORT ?? 1234

const app = express()

app.disable('x-powered-by') // deshabilita la cabecera X-Powered-By

app.get('/', (req,res) => {
    res.json({ message: 'Hello world' })
})




app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})