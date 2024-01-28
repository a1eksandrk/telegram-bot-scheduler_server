import { Telegram, UpdateType } from 'puregram'

import type BotDTO from './bot.dto.js'

class ObserverService {
  private readonly telegram: Telegram

  constructor (
    private readonly bot: BotDTO,
    private readonly chatRepository: BotObserverDI['chatRepository']
  ) {
    this.telegram = Telegram.fromToken(bot.token)
  }

  public watch = async (): Promise<void> => {
    this.telegram.updates.on(UpdateType.MyChatMember, context => {})

    this.telegram.updates.startPolling()
      .then(() => { console.log('started polling updates!') })
      .catch(error => { console.error('an error has occurred! %o', error) })
  }
}

export default ObserverService
