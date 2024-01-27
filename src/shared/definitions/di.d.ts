import type { Entities, Services, Repositories } from '#shared/types.js'

declare module '@fastify/awilix' {
  interface Cradle {
    db: DB
    services: Services
    entities: Entities
    repositories: Repositories
  }
}
