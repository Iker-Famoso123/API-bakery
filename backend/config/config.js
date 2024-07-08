export const config = {
    db: {
        host: process.env.DB_HOST ??'localhost',
        user: process.env.DB_USER ?? 'root',
        port: process.env.DB_PORT ?? '3307',
        password: process.env.DB_PASSWORD ?? '',
        database: process.env.DB_DATABASE ?? 'bakery'
    },
    weatherApi: {
        url: 'http://dataservice.accuweather.com/currentconditions/v1/233324',
        apiKey: 'vUBeprf7lY5ATyYxODGPGQzohxUnZ4oZ',
        details: 'true',
        language: 'es'
    }
};