import { randomUUID } from 'node:crypto'

import type { FastifyRequest, FastifyReply, RouteShorthandOptions } from 'fastify'

type ConnectBotBody = {
  token: string
}

const successResponseScheme = {
  properties: {
    id: { type: 'string' }
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

export const connectBotHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const { token } = request.body as ConnectBotBody

  const id = randomUUID()

  const { botRepository } = request.diScope.cradle

  reply.status(201).send({ id })
}
