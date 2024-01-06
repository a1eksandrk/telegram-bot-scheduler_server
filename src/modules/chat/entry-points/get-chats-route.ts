import { buildWhereParams } from '#shared/lib/query.js'

import type { FastifyInstance, RouteShorthandOptions, RouteHandlerMethod } from 'fastify'

type GetChatsQuery = {
  botId: string | null
}

export const getChatsOptions: RouteShorthandOptions = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        botId: { type: ['string', 'null'], default: null }
      }
    },
    response: {
      200: { type: 'array' }
    }
  }
}

export const createGetChatsHandler = (_: FastifyInstance): RouteHandlerMethod => {
  return async (request, reply) => {
    const { botId } = request.query as GetChatsQuery
    const { chatRepository } = request.diScope.cradle.repositories

    const botsAlias = 'bot'

    const chats = await chatRepository.createQueryBuilder('chat')
      .innerJoin('chat.bots', botsAlias)
      .where(...buildWhereParams(botsAlias, 'botId', botId))
      .getMany()

    reply.status(200).send(chats)
  }
}
