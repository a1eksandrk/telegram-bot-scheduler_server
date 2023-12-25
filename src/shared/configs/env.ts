import dotenv from 'dotenv'

dotenv.config()

const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: parseInt(process.env.PORT, 10) || 3000
}

export default env
