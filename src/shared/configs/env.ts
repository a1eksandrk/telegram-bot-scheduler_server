import dotenv from 'dotenv'

dotenv.config()

const DEFAULT_HOST = '127.0.0.1'
const DEFAULT_PORT = 3000
const DEFAULT_DB_PORT = 6000

const split = (environment: string, separator = ','): string[] => {
  return environment.split(separator).map(part => part.trim())
}

const env = {
  HOST: process.env.HOST || DEFAULT_HOST,
  PORT: parseInt(process.env.PORT, 10) || DEFAULT_PORT,

  ALLOWED_ORIGINS: split(process.env.ALLOWED_ORIGINS),
  ALLOWED_METHODS: split(process.env.ALLOWED_METHODS),

  DB_HOST: process.env.DB_HOST || DEFAULT_HOST,
  DB_PORT: parseInt(process.env.DB_PORT, 10) || DEFAULT_DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD
}

export default env
