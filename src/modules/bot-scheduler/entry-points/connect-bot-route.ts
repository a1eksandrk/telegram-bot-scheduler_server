import { TelegramError } from 'telegraf'

import type { FastifyInstance, RouteHandlerMethod, RouteShorthandOptions } from 'fastify'

type ConnectBotBody = {
  token: string
}

const botScheme: JSONSchema = {
  type: 'object',
  properties: {
    botId: { type: 'number' },
    token: { type: 'string' }
  }
}

export const connectBotOptions: RouteShorthandOptions = {
  schema: {
    body: {
      required: ['token'],
      ...botScheme
    },
    response: {
      200: botScheme,
      201: botScheme
    }
  }
}

export const createConnectBotHandler = (_: FastifyInstance): RouteHandlerMethod => {
  return async (request, reply) => {
    const { token } = request.body as ConnectBotBody
    const { botService } = request.diScope.cradle.services

    try {
      const savedBotTuple = await botService.authorize(token)

      if (!savedBotTuple) return await reply.status(401).send()

      const [isSaved, savedBotEntity] = savedBotTuple

      if (isSaved) return await reply.status(201).send(savedBotEntity)

      reply.status(200).send(savedBotEntity)
    } catch (error) {
      if (error instanceof TelegramError) {
        return await reply.status(error.code).send(error)
      }

      reply.status(500).send(error)
    }
  }
}
