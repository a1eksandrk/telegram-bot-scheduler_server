import ChatDTO from './chat.dto.js'

type GetChatsFilter = {
  botId: string | null
}

class ChatService {
  private readonly chatRepository: BotManagerDI['chatRepository']

  public constructor ({ chatRepository }: BotManagerDI) {
    this.chatRepository = chatRepository
  }

  public async getChat (chatId: string): Promise<ChatDTO | null> {
    const chatEntity = await this.chatRepository.findOneById(chatId)

    if (!chatEntity) return null

    return new ChatDTO(chatEntity)
  }

  public async removeChat (chatId: string): Promise<ChatDTO | null> {
    const chatEntity = await this.chatRepository.removeOneById(chatId)

    if (!chatEntity) return null

    return new ChatDTO(chatEntity)
  }

  public async getChats (filter: GetChatsFilter): Promise<ChatDTO[]> {
    const chats = await this.chatRepository.find(filter)

    if (!chats.length) return []

    return chats.map(chat => new ChatDTO(chat))
  }
}

export default ChatService
