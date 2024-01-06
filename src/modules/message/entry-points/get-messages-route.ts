import { buildWhereParams } from '#shared/lib/query.js'

import type { FastifyInstance, RouteShorthandOptions, RouteHandlerMethod } from 'fastify'

type GetMessagesQuery = {
  botId: string | null
  chatId: string | null
}

export const getMessagesOptions: RouteShorthandOptions = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        botId: { type: ['string', 'null'], default: null },
        chatId: { type: ['string', 'null'], default: null }
      }
    }
  }
}

export const createGetMessagesHandler = (_: FastifyInstance): RouteHandlerMethod => {
  return async (request, reply) => {
    const { botId, chatId } = request.query as GetMessagesQuery
    const { messageRepository } = request.diScope.cradle.repositories

    const botAlias = 'bot'
    const chatAlias = 'chat'

    const messages = await messageRepository.createQueryBuilder('messsage')
      .innerJoin('messsage.bot', botAlias)
      .where(...buildWhereParams(botAlias, 'botId', botId))
      .innerJoin('messsage.chat', chatAlias)
      .where(...buildWhereParams(chatAlias, 'chatId', chatId))
      .getMany()

    reply.status(200).send(messages)
  }
}
