import 'reflect-metadata'

import { EventEmitter } from 'node:events'

import awilix from 'awilix'
import createFastify from 'fastify'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

import db from '#app/db.js'
import BotConnectEmitter from '#app/bot-connect-emitter.js'
import env from '#shared/configs/env.js'

import botManagerApp from '#modules/bot-manager/app.js'
import userManagerApp from '#modules/user-manager/app.js'
import botObserverApp from '#modules/bot-observer/app.js'
import messageSchedulerApp from '#modules/message-scheduler/app.js'

import { logger } from '#shared/libs/log.js'

const emitter = new BotConnectEmitter(new EventEmitter())
const container = awilix.createContainer<DI>({ injectionMode: awilix.InjectionMode.PROXY })
const fastify = createFastify({ logger: true })

fastify.register(cors, { origin: env.ALLOWED_ORIGINS, methods: env.ALLOWED_METHODS })
fastify.register(swagger, {
  swagger: {
    info: {
      title: 'Telegram bot scheduler swagger',
      description: 'Server side of the application for delayed sending of messages via Telegram bot',
      version: '0.0.1'
    },
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
})
fastify.register(swaggerUi, {
  routePrefix: '/documentation',
  uiConfig: { docExpansion: 'list' },
  staticCSP: true,
  transformSpecificationClone: true
})

container.register({
  db: awilix.asValue(db),
  emitter: awilix.asValue(emitter)
})

try {
  await db.initialize()

  await botManagerApp.init(container, fastify)
  await userManagerApp.init(container, fastify)
  await botObserverApp.init(container)
  await messageSchedulerApp.init(container)

  await fastify.listen({ host: env.HOST, port: env.PORT })
} catch (error) {
  logger.error(error)
  process.exit(1)
}
