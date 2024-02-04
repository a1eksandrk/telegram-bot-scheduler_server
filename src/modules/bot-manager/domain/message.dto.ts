import type MessageEntity from '#shared/entities/message.entity.js'

class MessageDTO {
  private readonly _messageId: string
  private readonly _text: string
  private readonly _timestamp: Date

  public get messageId (): string { return this._messageId }
  public get text (): string { return this._text }
  public get timestamp (): Date { return this._timestamp }

  constructor (messageEntity: MessageEntity) {
    this._messageId = messageEntity.messageId
    this._text = messageEntity.text
    this._timestamp = messageEntity.timestamp
  }
}

export default MessageDTO
