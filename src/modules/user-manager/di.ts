import awilix from 'awilix'

import UserController from './entry-points/user.controller.js'
import UserService from './domain/user.service.js'
import UserRepository from './data-access/user.repository.js'

import type { AwilixContainer } from 'awilix'

const di = (container: AwilixContainer<DI>): AwilixContainer<UserManagerDI> => {
  const moduleContainer = awilix.createContainer<UserManagerDI>({ injectionMode: awilix.InjectionMode.PROXY })

  return moduleContainer.register({
    ...container.registrations,

    userController: awilix.asClass(UserController).singleton(),
    userService: awilix.asClass(UserService).singleton(),
    userRepository: awilix.asClass(UserRepository).singleton()
  })
}

export default di
