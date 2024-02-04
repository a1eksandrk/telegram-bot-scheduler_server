import { CronJob } from 'cron'

import { logger } from '#shared/libs/log.js'

const EVERY_MINUTE = '0 * * * * *'

class MessageController implements Controller {
  private readonly job: CronJob
  private readonly messageService: MessageSchedulerDI['messageService']

  public constructor ({ messageService }: MessageSchedulerDI) {
    this.messageService = messageService

    this.job = CronJob.from({
      cronTime: EVERY_MINUTE,
      onTick: this.handleTick
    })
  }

  public register (): void {
    this.job.start()

    logger.info('Message cron started')
  }

  private readonly handleTick = (): void => {
    const timestamp = new Date()

    this.messageService.broadcast(timestamp)
  }
}

export default MessageController
