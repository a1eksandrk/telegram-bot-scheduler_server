import { EventEmitter } from 'node:events'

import db from '#app/db.js'
import BotConnectEmitter from '#app/bot-connect-emitter.js'

import botManagerApp from '#modules/bot-manager/app.js'
import botObserverApp from '#modules/bot-observer/app.js'
import messageSchedulerApp from '#modules/message-scheduler/app.js'

const emitter = new BotConnectEmitter(new EventEmitter())

try {
  await db.initialize()

  await botManagerApp.init(db, emitter)
  await botObserverApp.init(db, emitter)
  await messageSchedulerApp.init(db)
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
}
