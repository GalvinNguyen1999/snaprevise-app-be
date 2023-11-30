import express from 'express'
import { locationRoute } from '~/routes/v1/locationRoute'
import { userRoute } from '~/routes/v1/userRoute'
import { authRoute } from '~/routes/v1/authRoute'
import { adminRoute } from '~/routes/v1/adminRoute'
import { authenticate, authorizeUser } from '~/middlewares/authMiddlewares'

const ROUTE = express.Router()

ROUTE.use('/auth', authRoute)

ROUTE.use('/admin', authenticate, authorizeUser('admin'), adminRoute)

ROUTE.use('/user', authenticate, authorizeUser('user'), userRoute)

ROUTE.use('/location', authenticate, authorizeUser('user'), locationRoute)

export const APIs_V1 = ROUTE
