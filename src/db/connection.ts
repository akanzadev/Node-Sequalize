import { Sequelize } from 'sequelize'
import { config } from '../config/config'

const sequelize = new Sequelize(config.DB.DB_NAME, config.DB.DB_USER, config.DB.DB_PASS, {
  host: config.DB.DB_HOST,
  dialect: 'mysql',
  port: Number(config.DB.DB_PORT)
})

export default sequelize
