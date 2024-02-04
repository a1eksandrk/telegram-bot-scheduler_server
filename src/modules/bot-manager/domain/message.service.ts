import { randomUUID } from 'node:crypto'

import MessageEntity from '#shared/entities/message.entity.js'

import MessageDTO from './message.dto.js'

export type Message = {
  text: string
  timestamp: Date
  botId: string
  chatId: string
}

type GetMessagesFilter = {
  botId: string | null
  chatId: string | null
}

class MessageService {
  private readonly botRepository: BotManagerDI['botRepository']
  private readonly chatRepository: BotManagerDI['chatRepository']
  private readonly messageRepository: BotManagerDI['messageRepository']

  public constructor ({ botRepository, chatRepository, messageRepository }: BotManagerDI) {
    this.botRepository = botRepository
    this.chatRepository = chatRepository
    this.messageRepository = messageRepository
  }

  public async addMessage (message: Message): Promise<MessageDTO | null> {
    const messageEntity = await this.createMessageEntity(message)

    if (!messageEntity) return null

    const savedMessage = await this.messageRepository.save(messageEntity)

    return new MessageDTO(savedMessage)
  }

  public async removeMessage (messageId: string): Promise<MessageDTO | null> {
    const messageEntity = await this.messageRepository.removeOneById(messageId)

    if (!messageEntity) return null

    return new MessageDTO(messageEntity)
  }

  public async getMessages (filter: GetMessagesFilter): Promise<MessageDTO[]> {
    const messages = await this.messageRepository.find(filter)

    if (!messages.length) return []

    return messages.map(message => new MessageDTO(message))
  }

  private async createMessageEntity ({ text, timestamp, botId, chatId }: Message): Promise<MessageEntity | null> {
    const bot = await this.botRepository.findOneById(botId)
    const chat = await this.chatRepository.findOneById(chatId)

    if (!bot || !chat) return null

    const messageEntity = new MessageEntity()

    messageEntity.messageId = randomUUID()
    messageEntity.text = text
    messageEntity.timestamp = timestamp
    messageEntity.bot = bot
    messageEntity.chat = chat

    return messageEntity
  }
}

export default MessageService
