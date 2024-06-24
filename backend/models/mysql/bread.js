import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: '3307',
    password: '',
    database: 'bakery'

}

const connection = await mysql.createConnection(config)

export class BreadModel {

    static async getAll () {
        console.log('getAll')

        

        
    }

    static async getById ({ id }) {

    }

    static async create ({ input }) {

    }

    static async delete ({ id }) {

    }

    static async update ({ id, input }) {

    }
}