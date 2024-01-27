import { EventEmitter } from 'node:events'

import awilix from 'awilix'

import db from '#app/db.js'
import BotConnectEmitter from '#app/bot-connect-emitter.js'

import botManagerApp from '#modules/bot-manager/app.js'
import botObserverApp from '#modules/bot-observer/app.js'
import messageSchedulerApp from '#modules/message-scheduler/app.js'

import type { AwilixContainer } from 'awilix'

const emitter = new BotConnectEmitter(new EventEmitter())

const initializeContainer = (): AwilixContainer<DI> => {
  const container = awilix.createContainer<DI>({ injectionMode: awilix.InjectionMode.PROXY })

  return container.register({
    db: awilix.asValue(db),
    emitter: awilix.asValue(emitter)
  })
}

try {
  await db.initialize()

  await botManagerApp.init(initializeContainer())
  await botObserverApp.init(initializeContainer())
  await messageSchedulerApp.init(initializeContainer())
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
}
