import express from 'express'
import { userController } from '~/controllers/userController'

const ROUTE = express.Router()

ROUTE.route('/:id')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser)

export const userRoute = ROUTE
