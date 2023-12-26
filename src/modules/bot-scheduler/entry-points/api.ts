import type { FastifyPluginAsync } from 'fastify'

import { getChatsHandler } from './get-chats-route.js'
import { connectBotOptions, connectBotHandler } from './connect-bot-route.js'

const botApi: FastifyPluginAsync = async fastify => {
  fastify.get('/bot/:id/chats', getChatsHandler)

  fastify.put('/bot/connect', connectBotOptions, connectBotHandler)
}

export default botApi
