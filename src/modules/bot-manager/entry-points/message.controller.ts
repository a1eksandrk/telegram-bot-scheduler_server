import { messageSchema, bodySchema, querystringScheme } from './message.schema.js'

import type { FastifyInstance, RouteHandlerMethod, RouteShorthandOptions } from 'fastify'

type AddMessageBody = {
  text: string
  timestamp: string
  botId: string
  chatId: string
}

type GetMessagesQuery = {
  botId: string | null
  chatId: string | null
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

class MessageController implements Controller {
  private readonly messageService: DI['messageService']

  public constructor ({ messageService }: DI) {
    this.messageService = messageService
  }

  public init = async (fastify: FastifyInstance): Promise<void> => {
    fastify.get('/messages', getMessagesRouteOptions, this.handleGetMessages)
    fastify.post('/message', addMessageOptions, this.handleAddMessageRoute)
  }

  private readonly handleGetMessages: RouteHandlerMethod = async (request, reply) => {
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
      const addedMessage = await this.messageService.addMessage(body)

      if (!addedMessage) return await reply.status(404).send()

      reply.status(201).send(addedMessage)
    } catch (error) {
      reply.status(500).send(error)
    }
  }
}

export default MessageController
