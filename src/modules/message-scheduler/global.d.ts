import type MessageController from './entry-points/message.controller.js'
import type MessageService from './domain/message.service.ts'

declare global {
  type MessageSchedulerDI = DI & {
    messageController: MessageController
    messageService: MessageService
  }
}

export {}
