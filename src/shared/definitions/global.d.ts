import type BotConnectEmitter from '#app/bot-connect-emitter.ts'

declare global {
  type Emitter = BotConnectEmitter
}
