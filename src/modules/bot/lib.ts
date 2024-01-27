import type { Update, ChatFromGetChat } from '@telegraf/types'
import type { NarrowedContext, Context } from 'telegraf'
import type { TgBot } from './domain/bot-service.js'

const buildChatName = (chat: ChatFromGetChat): string => {
  if (chat.type === 'private') return chat.first_name + ' ' + chat.last_name

  return chat.title
}

export const createSubscriberToChatStatusUpdate = async (di: DI, tgBot: TgBot): Promise<() => void> => {
  const { repositories: { botRepository, chatRepository }, entities: { ChatEntity } } = di

  const { id } = await tgBot.telegram.getMe()
  const botEntity = await botRepository.findOneBy({ botId: String(id) })

  const createChatEntity = async (chat: ChatFromGetChat): Promise<ChatEntity> => {
    const chatEntity = new ChatEntity()

    chatEntity.chatId = String(chat.id)
    chatEntity.name = buildChatName(chat)
    chatEntity.messages = []
    chatEntity.image = chat.photo?.small_file_id ? (await tgBot.telegram.getFileLink(chat.photo?.small_file_id)).href : null

    return chatEntity
  }

  const handleChatStatusUpdate = async (context: NarrowedContext<Context<Update>, Update.MyChatMemberUpdate>): Promise<void> => {
    if (!botEntity) return

    const { chat } = context.update.my_chat_member
    const { status } = context.update.my_chat_member.new_chat_member

    switch (status) {
      case 'creator':
      case 'member':
      case 'administrator': {
        const chatInfo = await tgBot.telegram.getChat(chat.id)
        const chatEntity = await createChatEntity(chatInfo)

        await chatRepository.save(chatEntity)

        botEntity.chats = [...(botEntity.chats ?? []), chatEntity]

        await botRepository.save(botEntity)

        break
      }

      case 'left':
      case 'kicked':
      case 'restricted':
        break
    }
  }

  return () => tgBot.on('my_chat_member', handleChatStatusUpdate)
}
