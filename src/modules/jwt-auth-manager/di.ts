import awilix from 'awilix'

import type { AwilixContainer } from 'awilix'

const di = (container: AwilixContainer<DI>): AwilixContainer<AuthManagerDI> => {
  const moduleContainer = awilix.createContainer<AuthManagerDI>({ injectionMode: awilix.InjectionMode.PROXY })

  return moduleContainer.register({
    ...container.registrations
  })
}

export default di
