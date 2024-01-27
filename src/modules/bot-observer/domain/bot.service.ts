// import BotEntity from '#shared/entities/bot.entity.js'

// import BotDTO from './bot.dto.js'

class BotService {
  private readonly botRepository: BotObserverDI['botRepository']

  public constructor ({ botRepository }: BotObserverDI) {
    this.botRepository = botRepository
  }
}

export default BotService
