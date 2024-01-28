class BotController implements Controller {
  private readonly emitter: BotObserverDI['emitter']
  private readonly botService: BotObserverDI['botService']

  public constructor ({ emitter, botService }: BotObserverDI) {
    this.emitter = emitter
    this.botService = botService
  }

  public async register (): Promise<void> {
    await this.botService.init()

    this.emitter.onBotConnected(this.botService.handleBotConnected)
  }
}

export default BotController
