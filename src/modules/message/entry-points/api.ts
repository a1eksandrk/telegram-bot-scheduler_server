import { getMessagesOptions, createGetMessagesHandler } from './get-messages-route.js'
import { addMessageOptions, createAddMessageHandler } from './add-message-route.js'

import type { FastifyPluginAsync } from 'fastify'

const messageApi: FastifyPluginAsync = async fastify => {
  fastify.get('/messages', getMessagesOptions, createGetMessagesHandler(fastify))

  fastify.post('/message', addMessageOptions, createAddMessageHandler(fastify))
}

export default messageApi
