import { botScheme, connectBotBody } from './bot.schema.js'

import type { FastifyInstance, RouteHandlerMethod, RouteShorthandOptions } from 'fastify'

type ConnectBotBody = {
  token: string
}

export const connectBotOptions: RouteShorthandOptions = {
  schema: {
    body: connectBotBody,
    response: {
      200: botScheme,
      201: botScheme
    }
  }
}

class BotController implements Controller {
  private readonly botService: DI['botService']

  public constructor ({ botService }: DI) {
    this.botService = botService
  }

  public init = async (fastify: FastifyInstance): Promise<void> => {
    fastify.put('/bot/connect', connectBotOptions, this.handleConnectBotRoute)
  }

  private readonly handleConnectBotRoute: RouteHandlerMethod = async (request, reply) => {
    try {
      const { token } = request.body as ConnectBotBody
      const connectedBot = await this.botService.connectBot(token)

      if (!connectedBot) return await reply.status(401).send()

      const [isCreated, bot] = connectedBot

      if (isCreated) return await reply.status(201).send(bot)

      reply.status(200).send(bot)
    } catch (error) {
      reply.status(500).send(error)
    }
  }
}

export default BotController
