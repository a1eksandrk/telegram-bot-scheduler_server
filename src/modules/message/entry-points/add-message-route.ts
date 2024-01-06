import type { FastifyInstance, RouteShorthandOptions, RouteHandlerMethod } from 'fastify'

type AddMessageBody = {
  text: string
  datetime: string
  botId: string
  chatId: string
}

const messageSchema: JSONSchema = {
  type: 'object',
  properties: {
    text: { type: 'string' },
    datetime: { type: 'string', format: 'date-time' },
    botId: { type: 'string' },
    chatId: { type: 'string' }
  }
}

export const addMessageOptions: RouteShorthandOptions = {
  schema: {
    body: {
      required: ['text', 'datetime', 'botId', 'chatId'],
      ...messageSchema
    },
    response: {
      201: {
        type: 'object',
        properties: {
          messageId: { type: 'string' },
          ...messageSchema.properties
        }
      }
    }
  }
}

export const createAddMessageHandler = (_: FastifyInstance): RouteHandlerMethod => {
  return async (request, reply) => {
    const { text, datetime, botId, chatId } = request.body as AddMessageBody
    const { MessageEntity } = request.diScope.cradle.entities
    const { botRepository, chatRepository, messageRepository } = request.diScope.cradle.repositories

    const messageId = String(Date.now())

    const bot = await botRepository.findOneBy({ botId })
    const chat = await chatRepository.findOneBy({ chatId })

    if (!bot || !chat) return await reply.status(404).send()

    try {
      const messageEntity = new MessageEntity()

      messageEntity.messageid = messageId
      messageEntity.text = text
      messageEntity.datetime = datetime
      messageEntity.bot = bot
      messageEntity.chat = chat

      await messageRepository.save(messageEntity)
    } catch (error) {
      reply.status(500).send(error)
    }

    reply.status(201).send({ messageId, text, datetime, botId, chatId })
  }
}
