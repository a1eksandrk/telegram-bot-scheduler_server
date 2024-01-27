import di from './di.js'

import type { AwilixContainer } from 'awilix'

const init = async (container: AwilixContainer<DI>): Promise<void> => {
  di(container)
}

export default { init }
