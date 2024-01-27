import type BotConnectEmitter from './bot-connect-emitter.ts'

declare global {
  type Controller = {
    register: () => Promise<void> | void
  }

  type DI = {
    db: DataSource
    emitter: BotConnectEmitter
  }
}

export {}
