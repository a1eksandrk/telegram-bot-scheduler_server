import type { FastifyInstance, RouteShorthandOptions, RouteHandlerMethod } from 'fastify'

type GetChatParams = {
  chatId: string
}

const chatScheme: JSONSchema = {
  type: 'object',
  properties: {
    chatId: { type: 'string' },
    name: { type: 'string' },
    image: { type: ['string', 'null'], default: null },
    messages: { type: ['array', 'null'], default: null }
  }
}

export const getChatOptions: RouteShorthandOptions = {
  schema: {
    params: {
      type: 'object',
      required: ['chatId'],
      properties: {
        chatId: chatScheme.properties?.chatId
      }
    },
    response: {
      200: chatScheme
    }
  }
}

export const createGetChatHandler = (_: FastifyInstance): RouteHandlerMethod => {
  return async (request, reply) => {
    const { chatId } = request.params as GetChatParams
    const { chatRepository } = request.diScope.cradle.repositories

    const chat = await chatRepository.findOneBy({ chatId })

    if (!chat) return await reply.status(404).send()

    reply.status(200).send(chat)
  }
}
