import express, { Application } from 'express'
import { config } from '../config/config'
import userRoutes from '../user/user.routes'
import cors from 'cors'
import sequelize from '../db/connection'

export default class NodeServer {
  private app:Application
  private port = config.SERVER.PORT
  constructor () {
    this.app = express()
    // Conectar a base de datos
    this.dbConnection()
    // Middlewares
    this.middlewares()
    // Routes
    this.routes()
  }

  public start () {
    this.listen()
  }

  private routes () {
    this.app.use('/api/users', userRoutes)
  }

  private middlewares () {
    // Cors middleware
    this.app.use(cors())
    // Body Parser
    this.app.use(express.json())
  }

  private async dbConnection () {
    // Database connection
    try {
      await sequelize.authenticate()
      console.log('Database online')
    } catch (error) {
      console.log('Database online', error)
    }
  }

  private listen () {
    this.app.listen(this.port, () => {
      console.log(`Server is up on port ${this.port}`)
    })
  }
}
