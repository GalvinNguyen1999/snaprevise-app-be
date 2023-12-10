import Sequelize from 'sequelize'
import { env } from '~/config/environment'

let snapreviseDatabaseInstance = null

export const sequelize = new Sequelize(
  env.POSTGRESQL_NAME,
  env.POSTGRESQL_USER,
  env.POSTGRESQL_PASSWORD,
  {
    host: env.APP_HOST,
    dialect: env.DIALECT
  }
)

export const CONNECT_DB = async () => {
  await sequelize.authenticate()
  await sequelize.sync()
  snapreviseDatabaseInstance = sequelize.models
}

export const CLOSE_DB = async () => {
  await sequelize.close()
}

export const GET_DB = () => {
  if (!snapreviseDatabaseInstance) { throw new Error('Must connect to database first!') }
  return snapreviseDatabaseInstance
}
