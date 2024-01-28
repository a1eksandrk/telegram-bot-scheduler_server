import type BotEntity from '#shared/entities/bot.entity.js'
import type { EventEmitter } from 'node:events'

const EVENTS = {
  botCreated: 'botCreated'
} as const

class BotConnectEmitter {
  public constructor (private readonly emitter: EventEmitter) {}

  public botConnected (bot: BotEntity): void {
    this.emitter.emit(EVENTS.botCreated, bot)
  }

  public onBotConnected (callback: (bot: BotEntity) => void): void {
    this.emitter.on(EVENTS.botCreated, callback)
  }
}

export default BotConnectEmitter
