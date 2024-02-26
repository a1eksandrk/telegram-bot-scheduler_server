import di from './di.js'

import type { FastifyInstance } from 'fastify'
import type { AwilixContainer } from 'awilix'

const API_PREFIX = '/api'

const init = async (container: AwilixContainer<DI>, fastify: FastifyInstance): Promise<void> => {
  const { userController } = di(container).cradle

  fastify.register(userController.register, { prefix: API_PREFIX })
}

export default { init }
