import 'reflect-metadata'

import Fastify from 'fastify'
import cors from '@fastify/cors'

import env from '#shared/configs/env.js'

import di from './di.js'

import type { DataSource } from 'typeorm'

const API_PREFIX = '/api'

const init = async (db: DataSource, emitter: Emitter): Promise<void> => {
  const { botController, chatController, messageController } = di(db, emitter).cradle

  const fastify = Fastify({ logger: true })

  fastify.register(cors, { origin: env.ALLOWED_ORIGINS, methods: env.ALLOWED_METHODS })

  fastify.register(botController.init, { prefix: API_PREFIX })
  fastify.register(chatController.init, { prefix: API_PREFIX })
  fastify.register(messageController.init, { prefix: API_PREFIX })

  await fastify.listen({ host: env.HOST, port: env.PORT })
}

export default { init }
