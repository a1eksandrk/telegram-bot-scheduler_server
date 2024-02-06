import di from './di.js'

import type { AwilixContainer } from 'awilix'

const init = async (container: AwilixContainer<DI>): Promise<void> => {
  const { messageController } = di(container).cradle

  messageController.register()
}

export default { init }
