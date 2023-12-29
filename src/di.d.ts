import type { DataSource } from 'typeorm'
import type { Entities, Repositories } from '#shared/types.ts'

declare module '@fastify/awilix' {
  interface Cradle {
    db: DataSource
    entities: Entities
    repositories: Repositories
  }
}
