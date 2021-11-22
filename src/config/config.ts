import dotenv from 'dotenv'
// Config dotenv
dotenv.config({ path: './src/envs/.env' })
export const config = {
  SERVER: {
    PORT: process.env.PORT || 4600,
    MODE: process.env.NODE_ENV || 'DEV'
  },
  DB: {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || 27017,
    DB_NAME: process.env.DB_NAME || 'node',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASS: process.env.DB_PASS || 'admin'
  },
  JWT: {
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'dev',
    TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION || '1h'
  }
}
