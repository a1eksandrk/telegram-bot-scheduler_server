import di from './di.js'

import type { AwilixContainer } from 'awilix'

const init = async (container: AwilixContainer<DI>): Promise<void> => {
  const { botController } = di(container).cradle

  await botController.register()
}

export default { init }
