import { Telegram, UpdateType } from 'puregram'

import { logger } from '#shared/libs/log.js'
import ChatEntity from '#shared/entities/chat.entity.js'

import { buildChatName } from './lib.js'

import type { ChatMemberContext } from 'puregram'
import type { TelegramChat } from 'puregram/generated'
import type BotEntity from '#shared/entities/bot.entity.js'

class ObserverService {
  private readonly telegram: Telegram

  public constructor (
    private readonly botEntity: BotEntity,
    private readonly chatRepository: BotObserverDI['chatRepository']
  ) {
    this.telegram = Telegram.fromToken(botEntity.token)
  }

  public watch = async (): Promise<void> => {
    this.telegram.updates.on(UpdateType.MyChatMember, this.handleMyChatMember)

    this.telegram.updates.startPolling()
      .then(() => { logger.info('Started polling bot updates from id = %s', this.botEntity.botId) })
      .catch(error => { logger.error('An error has occurred! %o', error) })
  }

  private readonly handleMyChatMember = async (context: ChatMemberContext): Promise<void> => {
    const myChatMember = context.update?.my_chat_member

    if (!myChatMember) return

    const { chat } = myChatMember
    const { status } = myChatMember.new_chat_member

    switch (status) {
      case 'creator': case 'member': case 'administrator':
        await this.proccessAdmission(chat)
        break
      case 'left': case 'kicked': case 'restricted':
        await this.proccessExpulsion(chat)
        break
    }
  }

  private async proccessAdmission (chat: TelegramChat): Promise<void> {
    const foundEntity = await this.chatRepository.findOneById(String(chat.id))

    const chatEntity = await this.createOrUpdateChatEntity(chat, foundEntity)

    await this.chatRepository.save(chatEntity)

    logger.info(chat, `chat saved ${chatEntity.chatId}`)
  }

  private async createOrUpdateChatEntity (chat: TelegramChat, foundEntity: ChatEntity | null): Promise<ChatEntity> {
    if (foundEntity) {
      foundEntity.bots = [this.botEntity, ...foundEntity.bots]

      return foundEntity
    }

    const chatEntity = new ChatEntity()

    chatEntity.chatId = String(chat.id)
    chatEntity.name = buildChatName(chat)
    chatEntity.image = await this.getChatImageLink(chat)
    chatEntity.bots = [this.botEntity]
    chatEntity.messages = []

    return chatEntity
  }

  private async getChatImageLink (chat: TelegramChat): Promise<string | null> {
    if (!chat.photo?.small_file_id) return null

    const fileId = chat.photo.small_file_id

    const { file_path: filePath } = await this.telegram.api.getFile({ file_id: fileId })

    return filePath ?? null
  }

  private async proccessExpulsion (chat: TelegramChat): Promise<void> {
    await this.chatRepository.removeOneById(String(chat.id))
    logger.info(chat, `chat removed ${chat.id}`)
  }
}

export default ObserverService
