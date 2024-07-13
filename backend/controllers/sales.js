import { SalesModel } from '../models/mysql/sale/sale.js'

export class SalesController {
    static async getAll (req, res) {
        const sales = await SalesModel.getAll()
        res.json(sales)
    }

    static async getById (req, res) {

    }

    static async create (req, res) {
        const result = req.body
        console.log("ResInput:", result)
        const newSale = await SalesModel.create({ input: result })

        res.status(201).json(newSale)

        
    }

    static async delete (req, res) {

    }

    static async update (req, res) {

    }
}