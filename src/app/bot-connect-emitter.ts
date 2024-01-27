import type { EventEmitter } from 'node:events'

const EVENTS = {
  botCreated: 'botCreated'
} as const

class BotConnectEmitter {
  public constructor (private readonly emitter: EventEmitter) {}

  public botConnected (botId: string): void {
    this.emitter.emit(EVENTS.botCreated, botId)
  }

  public onBotConnected (callback: (botId: string) => void): void {
    this.emitter.on(EVENTS.botCreated, callback)
  }
}

export default BotConnectEmitter
