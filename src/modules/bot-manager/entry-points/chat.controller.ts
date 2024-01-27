import { chatScheme, paramsScheme, querystringScheme } from './chat.schema.js'

import type { FastifyInstance, RouteHandlerMethod, RouteShorthandOptions } from 'fastify'

type GetChatParams = {
  chatId: string
}

type GetChatsQuery = {
  botId: string | null
}

const getChatRouteOptions: RouteShorthandOptions = {
  schema: {
    params: paramsScheme,
    response: {
      200: chatScheme
    }
  }
}

const getChatsRouteOptions: RouteShorthandOptions = {
  schema: {
    querystring: querystringScheme,
    response: {
      200: { type: 'array', items: chatScheme }
    }
  }
}

class ChatController implements Controller {
  private readonly chatService: BotManagerDI['chatService']

  public constructor ({ chatService }: BotManagerDI) {
    this.chatService = chatService
  }

  public register = async (fastify: FastifyInstance): Promise<void> => {
    fastify.get('/chats', getChatRouteOptions, this.handleGetChatRoute)
    fastify.get('/chat/:chatId', getChatsRouteOptions, this.handleGetChatsRoute)
  }

  private readonly handleGetChatRoute: RouteHandlerMethod = async (request, reply) => {
    try {
      const { chatId } = request.params as GetChatParams

      const chat = await this.chatService.getChatById(chatId)

      if (!chat) return await reply.status(404).send()

      reply.status(200).send(chat)
    } catch (error) {
      reply.status(500).send(error)
    }
  }

  private readonly handleGetChatsRoute: RouteHandlerMethod = async (request, reply) => {
    try {
      const query = request.query as GetChatsQuery
      const chats = await this.chatService.getChats(query)

      reply.status(200).send(chats)
    } catch (error) {
      reply.status(500).send(error)
    }
  }
}

export default ChatController
