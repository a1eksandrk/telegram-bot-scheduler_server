import { Telegraf } from 'telegraf'

import { createSubscriberToChatStatusUpdate } from '../lib.js'

type SavedBotTuple = [boolean, BotEntity]
export type TgBot = Telegraf

class BotService {
  constructor (private readonly di: DI) {}

  /**
   * The function returns a tuple in which the first element indicates whether
   * the entity was successfully saved in the database and the second element contains the saved entity.
   */
  public async authorize (token: string): Promise<SavedBotTuple | null> {
    const tgBot = new Telegraf(token)
    const savedBotTuple = await this.saveBot(tgBot, token)

    this.launchBot(tgBot)

    return savedBotTuple
  }

  private async saveBot (tgBot: TgBot, token: string): Promise<[boolean, BotEntity] | null> {
    const { repositories: { botRepository } } = this.di

    const fondedBotEntity = await botRepository.findOneBy({ token })

    if (fondedBotEntity) return [false, fondedBotEntity]

    const { id } = await tgBot.telegram.getMe()

    const savedBotEntity = this.createBotEntity({ botId: String(id), token })

    await botRepository.save(savedBotEntity)

    return [true, savedBotEntity]
  }

  private createBotEntity ({ botId, token }: Pick<BotEntity, 'botId' | 'token'>): BotEntity {
    const { entities: { BotEntity } } = this.di

    const botEntity = new BotEntity()

    botEntity.botId = botId
    botEntity.token = token
    botEntity.chats = []
    botEntity.messages = []

    return botEntity
  }

  private async launchBot (tgBot: TgBot): Promise<void> {
    const subscriber = await createSubscriberToChatStatusUpdate(this.di, tgBot)

    subscriber()

    await tgBot.launch().catch(subscriber)
  }
}

export default BotService
