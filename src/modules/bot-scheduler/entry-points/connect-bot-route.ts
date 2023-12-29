import BotService from '../domain/bot-service.js'

import type { FastifyInstance, RouteHandlerMethod, RouteShorthandOptions } from 'fastify'

type ConnectBotBody = {
  token: string
}

const successResponseScheme = {
  properties: {
    id: { type: 'number' },
    token: { type: 'string' }
  }
}

export const connectBotOptions: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['token'],
      properties: {
        token: { type: 'string' }
      }
    },
    response: {
      201: successResponseScheme,
      202: successResponseScheme
    }
  }
}

export const createConnectBotHandler = (_: FastifyInstance): RouteHandlerMethod => {
  return async (request, reply) => {
    const { token } = request.body as ConnectBotBody
    const { BotEntity } = request.diScope.cradle.entities
    const { botRepository } = request.diScope.cradle.repositories

    const botService = new BotService(token)

    try {
      const bot = await botService.getMe()

      if (!bot) return await reply.status(404).send()

      const fondedBot = await botRepository.findOneBy({ token })

      if (fondedBot) return await reply.status(204).send(fondedBot)

      const botEntity = new BotEntity()

      botEntity.botId = bot.id
      botEntity.token = bot.token

      // await botRepository.save(botEntity)

      reply.status(201).send(botEntity)
    } catch (error) {
      reply.status(500).send()
    }
  }
}
