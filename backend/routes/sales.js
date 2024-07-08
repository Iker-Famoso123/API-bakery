import { Router } from 'express'

import { SalesController } from '../controllers/sales.js'

export const salesRouter = Router()

salesRouter.get('/', SalesController.getAll)
salesRouter.post('/', SalesController.create)

salesRouter.get('/:id', SalesController.getById)
salesRouter.delete('/:id', SalesController.delete)
salesRouter.patch('/:id', SalesController.update)