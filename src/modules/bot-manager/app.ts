import 'reflect-metadata'

import Fastify from 'fastify'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

import env from '#shared/configs/env.js'

import di from './di.js'

import type { AwilixContainer } from 'awilix'

const API_PREFIX = '/api'

const init = async (container: AwilixContainer<DI>): Promise<void> => {
  const { botController, chatController, messageController } = di(container).cradle

  const fastify = Fastify({ logger: true })

  fastify.register(cors, { origin: env.ALLOWED_ORIGINS, methods: env.ALLOWED_METHODS })
  fastify.register(swagger)
  fastify.register(swaggerUi, {
    routePrefix: '/documentation',
    uiConfig: { docExpansion: 'list' },
    staticCSP: true,
    transformSpecificationClone: true
  })

  fastify.register(botController.register, { prefix: API_PREFIX })
  fastify.register(chatController.register, { prefix: API_PREFIX })
  fastify.register(messageController.register, { prefix: API_PREFIX })

  await fastify.listen({ host: env.HOST, port: env.PORT })
}

export default { init }
