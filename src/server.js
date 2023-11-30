/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { CONNECT_DB, CLOSE_DB } from '~/config/database'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import { APIs_V1 } from './routes/v1'

const startApp = async () => {
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors())

  app.get('/', (req, res) => {
    res.send('Hello World')
  })

  // V1 APIs routes
  app.use('/v1', APIs_V1)

  // Error handling middleware
  app.use(errorHandlingMiddleware)

  // Start the server
  app.listen(env.APP_PORT, () => {
    console.log(`Server is running on port http://${env.APP_HOST}:${env.APP_PORT}`)
  })

  // Exit hook
  exitHook(() => CLOSE_DB())
}

CONNECT_DB()
  .then(() => console.log('Database connected'))
  .then(() => startApp())
  .catch((error) => {
    console.error(error)
    process.exit(0)
  })