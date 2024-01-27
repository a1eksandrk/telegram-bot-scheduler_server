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

class BotController implements BotManagerController {
  private readonly emitter: BotManagerDI['emitter']
  private readonly botService: BotManagerDI['botService']

  public constructor ({ emitter, botService }: BotManagerDI) {
    this.emitter = emitter
    this.botService = botService
  }

  public register = async (fastify: FastifyInstance): Promise<void> => {
    fastify.put('/bot/connect', connectBotOptions, this.handleConnectBotRoute)
  }

  private readonly handleConnectBotRoute: RouteHandlerMethod = async (request, reply) => {
    try {
      const { token } = request.body as ConnectBotBody
      const connectedBot = await this.botService.connectBot(token)

      if (!connectedBot) return await reply.status(401).send()

      const [isCreated, bot] = connectedBot

      if (!isCreated) return await reply.status(200).send(bot)

      this.emitter.botConnected(bot.botId)

      reply.status(201).send(bot)
    } catch (error) {
      reply.status(500).send(error)
    }
  }
}

export default BotController
