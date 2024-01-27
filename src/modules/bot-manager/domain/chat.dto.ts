import type ChatEntity from '#shared/entities/chat.entity.js'

class ChatDTO {
  private readonly _chatId: string
  private readonly _name: string
  private readonly _image: string | null

  public get chatId (): string { return this._chatId }
  public get name (): string { return this._name }
  public get image (): string | null { return this._image }

  constructor (chatEntity: ChatEntity) {
    this._chatId = chatEntity.chatId
    this._name = chatEntity.name
    this._image = chatEntity.image
  }
}

export default ChatDTO
