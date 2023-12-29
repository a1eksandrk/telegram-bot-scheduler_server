import 'reflect-metadata'

import Fastify from 'fastify'
import { fastifyAwilixPlugin } from '@fastify/awilix'

import env from '#shared/configs/env.js'

import db from '#app/db.js'
import di from '#app/di.js'

import botApi from '#modules/bot-scheduler/entry-points/api.js'
import chatApi from '#modules/chat/entry-points/api.js'
import messageApi from '#modules/message/entry-points/api.js'

const API_PREFIX = '/api'

const fastify = Fastify({ logger: true })

fastify.register(fastifyAwilixPlugin, { disposeOnClose: true, disposeOnResponse: true })

fastify.register(botApi, { prefix: API_PREFIX })
fastify.register(chatApi, { prefix: API_PREFIX })
fastify.register(messageApi, { prefix: API_PREFIX })

try {
  di(db)

  await db.initialize()
  await fastify.listen({ host: env.HOST, port: env.PORT })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
