import express from 'express'
import { authController } from '~/controllers/authController'
const ROUTE = express.Router()

ROUTE.route('/sign-up')
  .post(authController.signUp)

ROUTE.route('/sign-in')
  .post(authController.signIn)

export const authRoute = ROUTE
