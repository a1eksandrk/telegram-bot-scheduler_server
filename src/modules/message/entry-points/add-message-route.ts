import { randomUUID } from 'node:crypto'

import type { FastifyInstance, RouteShorthandOptions, RouteHandlerMethod } from 'fastify'

type AddMessageBody = {
  text: string
  datetime: string
  botId: number
  chatId: number
}

export const addMessageOptions: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['text', 'datetime', 'botId', 'chatId'],
      properties: {
        text: { type: 'string' },
        datetime: { type: 'string' },
        botId: { type: 'number' },
        chatId: { type: 'number' }
      }
    },
    response: {
      201: {
        properties: {
          id: { type: 'number' },
          text: { type: 'string' },
          datetime: { type: 'string' }
        }
      }
    }
  }
}

export const createAddMessageHandler = (_: FastifyInstance): RouteHandlerMethod => {
  return async (request, reply) => {
    const { text, datetime, botId, chatId } = request.body as AddMessageBody

    const id = Date.now()

    // request.diScope.cradle

    reply.status(201).send({ id, text, datetime, botId, chatId })
  }
}
