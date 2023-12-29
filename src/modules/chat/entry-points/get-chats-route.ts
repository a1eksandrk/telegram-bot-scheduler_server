import type { FastifyInstance, RouteShorthandOptions, RouteHandlerMethod } from 'fastify'

type GetChatsQuery = {
  botId: number
}

export const getChatsOptions: RouteShorthandOptions = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        botId: { type: 'number' }
      }
    }
  }
}

export const createGetChatsHandler = (_: FastifyInstance): RouteHandlerMethod => {
  return async (request, reply) => {
    const { botId } = request.query as GetChatsQuery

    reply.status(200).send(botId)
  }
}
