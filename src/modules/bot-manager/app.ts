import di from './di.js'

import type { FastifyInstance } from 'fastify'
import type { AwilixContainer } from 'awilix'

const API_PREFIX = '/api'

const init = async (container: AwilixContainer<DI>, fastify: FastifyInstance): Promise<void> => {
  const { botController, chatController, messageController } = di(container).cradle

  fastify.register(botController.register, { prefix: API_PREFIX })
  fastify.register(chatController.register, { prefix: API_PREFIX })
  fastify.register(messageController.register, { prefix: API_PREFIX })
}

export default { init }
