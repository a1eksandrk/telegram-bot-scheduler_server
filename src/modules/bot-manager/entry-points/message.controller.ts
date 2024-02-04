import { messageSchema, bodySchema, paramsSchema, querystringScheme } from './message.schema.js'

import type { Message } from '../domain/message.service.js'
import type { FastifyInstance, RouteHandlerMethod, RouteShorthandOptions } from 'fastify'

type GetMessagesQuery = {
  botId: string | null
  chatId: string | null
}

type AddMessageBody = {
  text: string
  timestamp: string
  botId: string
  chatId: string
}

type DeleteMessageParams = {
  messageId: string
}

const addMessageOptions: RouteShorthandOptions = {
  schema: {
    body: bodySchema,
    response: {
      201: messageSchema
    }
  }
}

const getMessagesRouteOptions: RouteShorthandOptions = {
  schema: {
    querystring: querystringScheme,
    response: {
      200: { type: 'array', items: messageSchema }
    }
  }
}

const deleteMessageOptions: RouteShorthandOptions = {
  schema: {
    params: paramsSchema,
    response: {
      200: messageSchema
    }
  }
}

class MessageController implements BotManagerController {
  private readonly messageService: BotManagerDI['messageService']

  public constructor ({ messageService }: BotManagerDI) {
    this.messageService = messageService
  }

  public register = async (fastify: FastifyInstance): Promise<void> => {
    fastify.get('/messages', getMessagesRouteOptions, this.handleGetMessagesRoute)
    fastify.post('/message', addMessageOptions, this.handleAddMessageRoute)
    fastify.delete('/message/:messageId', deleteMessageOptions, this.handleDeleteMessageRoute)
  }

  private readonly handleGetMessagesRoute: RouteHandlerMethod = async (request, reply) => {
    try {
      const query = request.query as GetMessagesQuery
      const messages = await this.messageService.getMessages(query)

      reply.status(200).send(messages)
    } catch (error) {
      reply.status(500).send(error)
    }
  }

  private readonly handleAddMessageRoute: RouteHandlerMethod = async (request, reply) => {
    try {
      const body = request.body as AddMessageBody
      const timestamp = new Date(body.timestamp)

      if (isNaN(Number(timestamp))) return await reply.status(400).send()

      const message: Message = { ...body, timestamp }
      const addedMessage = await this.messageService.addMessage(message)

      if (!addedMessage) return await reply.status(404).send()

      reply.status(201).send(addedMessage)
    } catch (error) {
      reply.status(500).send(error)
    }
  }

  private readonly handleDeleteMessageRoute: RouteHandlerMethod = async (request, reply) => {
    try {
      const { messageId } = request.params as DeleteMessageParams
      const messages = await this.messageService.removeMessage(messageId)

      if (!messages) return await reply.status(404).send()

      reply.status(200).send(messages)
    } catch (error) {
      reply.status(500).send(error)
    }
  }
}

export default MessageController
