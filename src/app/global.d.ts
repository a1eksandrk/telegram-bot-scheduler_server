import type BotConnectEmitter from './bot-connect-emitter.ts'

declare global {
  interface DI {
    db: DataSource
    emitter: BotConnectEmitter
  }
}

export {}
