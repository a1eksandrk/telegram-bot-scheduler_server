import di from './di.js'

import type { FastifyInstance } from 'fastify'
import type { AwilixContainer } from 'awilix'

const init = async (container: AwilixContainer<DI>, fastify: FastifyInstance): Promise<void> => {
  const {} = di(container).cradle
}

export default { init }
