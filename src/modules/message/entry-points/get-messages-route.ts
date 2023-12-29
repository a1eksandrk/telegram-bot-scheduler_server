import type { FastifyInstance, RouteShorthandOptions, RouteHandlerMethod } from 'fastify'

type GetMessagesQuery = {
  botId: number
  chatId: number
}

export const getMessagesOptions: RouteShorthandOptions = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        botId: { type: 'number' },
        chatId: { type: 'number' }
      }
    }
  }
}

export const createGetMessagesHandler = (_: FastifyInstance): RouteHandlerMethod => {
  return async (request, reply) => {
    const { botId, chatId } = request.query as GetMessagesQuery

    reply.status(200).send({ botId, chatId })
  }
}
