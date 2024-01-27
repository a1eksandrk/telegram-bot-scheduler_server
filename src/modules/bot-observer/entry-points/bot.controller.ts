class BotController implements Controller {
  private readonly emitter: BotObserverDI['emitter']
  private readonly botService: BotObserverDI['botService']

  public constructor ({ emitter, botService }: BotObserverDI) {
    this.emitter = emitter
    this.botService = botService
  }

  public register = async (): Promise<void> => {}
}

export default BotController
