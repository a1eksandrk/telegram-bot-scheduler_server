import { chatScheme, paramsScheme, querystringScheme } from './chat.schema.js'

import type { FastifyInstance, RouteHandlerMethod, RouteShorthandOptions } from 'fastify'

type GetChatsQuery = {
  botId: string | null
}

type ChatParams = {
  chatId: string
}

const getChatsRouteOptions: RouteShorthandOptions = {
  schema: {
    tags: ['bot-manager'],
    querystring: querystringScheme,
    response: {
      200: { type: 'array', items: chatScheme }
    }
  }
}

const сhatRouteOptions: RouteShorthandOptions = {
  schema: {
    tags: ['bot-manager'],
    params: paramsScheme,
    response: {
      200: chatScheme
    }
  }
}

class ChatController implements BotManagerController {
  private readonly chatService: BotManagerDI['chatService']

  public constructor ({ chatService }: BotManagerDI) {
    this.chatService = chatService
  }

  public register = async (fastify: FastifyInstance): Promise<void> => {
    fastify.get('/chats', getChatsRouteOptions, this.handleGetChatsRoute)
    fastify.get('/chat/:chatId', сhatRouteOptions, this.handleGetChatRoute)
    fastify.delete('/chat/:chatId', сhatRouteOptions, this.handleDeleteChatRoute)
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

  private readonly handleGetChatRoute: RouteHandlerMethod = async (request, reply) => {
    try {
      const { chatId } = request.params as ChatParams
      const chat = await this.chatService.getChat(chatId)

      if (!chat) return await reply.status(404).send()

      reply.status(200).send(chat)
    } catch (error) {
      reply.status(500).send(error)
    }
  }

  private readonly handleDeleteChatRoute: RouteHandlerMethod = async (request, reply) => {
    try {
      const { chatId } = request.params as ChatParams
      const chat = await this.chatService.removeChat(chatId)

      if (!chat) return await reply.status(404).send()

      reply.status(200).send(chat)
    } catch (error) {
      reply.status(500).send(error)
    }
  }
}

export default ChatController
