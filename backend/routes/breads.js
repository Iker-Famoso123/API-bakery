import { Router } from 'express'

import { BreadController } from '../controllers/breads.js'

export const breadsRouter = Router()

breadsRouter.get('/', BreadController.getAll)
breadsRouter.post('/', BreadController.create)

breadsRouter.get('/:id', BreadController.getById)
breadsRouter.delete('/:id', BreadController.delete)
breadsRouter.patch('/:id', BreadController.update)