import { botScheme, connectBotBody } from './bot.schema.js'

import type { FastifyInstance, RouteHandlerMethod, RouteShorthandOptions } from 'fastify'

type ConnectBotBody = {
  token: string
}

const connectBotOptions: RouteShorthandOptions = {
  schema: {
    body: connectBotBody,
    response: {
      200: botScheme,
      201: botScheme
    }
  }
}

class BotController implements BotManagerController {
  private readonly botService: BotManagerDI['botService']

  public constructor ({ botService }: BotManagerDI) {
    this.botService = botService
  }

  public register = async (fastify: FastifyInstance): Promise<void> => {
    fastify.put('/bot/connect', connectBotOptions, this.handleConnectBotRoute)
  }

  private readonly handleConnectBotRoute: RouteHandlerMethod = async (request, reply) => {
    try {
      const { token } = request.body as ConnectBotBody
      const connectedBot = await this.botService.connectBot(token)

      if (!connectedBot) return await reply.status(400).send()

      const [isCreated, bot] = connectedBot

      if (!isCreated) return await reply.status(200).send(bot)

      reply.status(201).send(bot)
    } catch (error) {
      reply.status(500).send(error)
    }
  }
}

export default BotController
