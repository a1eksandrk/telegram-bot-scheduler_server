/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  type ProcessEnv = {
    HOST: string
    PORT: string

    ALLOWED_ORIGINS: string
    ALLOWED_METHODS: string

    DB_HOST: string
    DB_PORT: string
    DB_NAME: string
    DB_USERNAME: string
    DB_PASSWORD: string

    JWT_SECTER: string
  }
}
