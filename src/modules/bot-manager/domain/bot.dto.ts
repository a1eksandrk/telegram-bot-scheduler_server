import type BotEntity from '#shared/entities/bot.entity.js'

class BotDTO {
  private readonly _botId: string
  private readonly _token: string

  public get botId (): string { return this._botId }
  public get token (): string { return this._token }

  constructor (botEntity: BotEntity) {
    this._botId = botEntity.botId
    this._token = botEntity.token
  }
}

export default BotDTO
