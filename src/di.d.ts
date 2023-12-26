import type { BotRepository } from '#modules/bot-scheduler/types.ts'

declare module '@fastify/awilix' {
  interface Cradle {
    botRepository: BotRepository
  }
  interface RequestCradle {
    botRepository: BotRepository
  }
}
