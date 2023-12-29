import { getChatOptions, createGetChatHandler } from './get-chat-route.js'
import { getChatsOptions, createGetChatsHandler } from './get-chats-route.js'

import type { FastifyPluginAsync } from 'fastify'

const chatApi: FastifyPluginAsync = async fastify => {
  fastify.get('/chats', getChatsOptions, createGetChatsHandler(fastify))

  fastify.get('/chat/:chatId', getChatOptions, createGetChatHandler(fastify))
}

export default chatApi
