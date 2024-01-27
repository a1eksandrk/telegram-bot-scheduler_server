import 'reflect-metadata'

import Fastify from 'fastify'
import cors from '@fastify/cors'

import env from '#shared/configs/env.js'

import db from './db.js'
import di from './di.js'

const API_PREFIX = '/api'

const init = async (): Promise<void> => {
  const { botController, chatController, messageController } = di(db).cradle

  const fastify = Fastify({ logger: true })

  fastify.register(cors, { origin: env.ALLOWED_ORIGINS, methods: env.ALLOWED_METHODS })

  fastify.register(botController.init, { prefix: API_PREFIX })
  fastify.register(chatController.init, { prefix: API_PREFIX })
  fastify.register(messageController.init, { prefix: API_PREFIX })

  try {
    await db.initialize()
    await fastify.listen({ host: env.HOST, port: env.PORT })
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

export default { init }
