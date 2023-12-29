import type { FastifyInstance, RouteShorthandOptions, RouteHandlerMethod } from 'fastify'

type GetChatParams = {
  chatId: number
}

export const getChatOptions: RouteShorthandOptions = {
  schema: {
    params: {
      type: 'object',
      properties: {
        chatId: { type: 'number' }
      }
    }
  }
}

export const createGetChatHandler = (_: FastifyInstance): RouteHandlerMethod => {
  return async (request, reply) => {
    const { chatId } = request.params as GetChatParams

    reply.status(200).send(chatId)
  }
}
