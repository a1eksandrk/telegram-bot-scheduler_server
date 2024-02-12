import BotEntity from '#shared/entities/bot.entity.js'
import BotDTO from './bot.dto.js'

type ConnectedBot = [boolean, BotDTO]

type Bot = {
  botId: string
  token: string
}

type BotInfo = {
  ok: true
  result: {
    id: number
  }
}

class BotService {
  private readonly emitter: BotManagerDI['emitter']
  private readonly botRepository: BotManagerDI['botRepository']

  public constructor ({ emitter, botRepository }: BotManagerDI) {
    this.emitter = emitter
    this.botRepository = botRepository
  }

  public async connectBot (token: string): Promise<ConnectedBot | null> {
    try {
      const fondedBotEntity = await this.botRepository.findOneByToken(token)

      if (fondedBotEntity) return [false, new BotDTO(fondedBotEntity)]

      const response = await fetch(`https://api.telegram.org/bot${token}/getMe`)
      const json = await response.json() as BotInfo

      if (!json.ok) return null

      const botId = String(json.result.id)

      const botEntity = await this.createBotEntity({ botId, token })
      const savedBotEntity = await this.botRepository.save(botEntity)

      this.emitter.botConnected(savedBotEntity)

      return [true, new BotDTO(savedBotEntity)]
    } catch (error) {
      return null
    }
  }

  private async createBotEntity ({ botId, token }: Bot): Promise<BotEntity> {
    const botEntity = new BotEntity()

    botEntity.botId = botId
    botEntity.token = token

    return botEntity
  }
}

export default BotService
