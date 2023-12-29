import { connectBotOptions, createConnectBotHandler } from './connect-bot-route.js'

import type { FastifyPluginAsync } from 'fastify'

const botApi: FastifyPluginAsync = async fastify => {
  fastify.put('/bot/connect', connectBotOptions, createConnectBotHandler(fastify))
}

export default botApi
