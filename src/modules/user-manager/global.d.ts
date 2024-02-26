import type { FastifyInstance } from 'fastify'

import type UserController from './entry-points/user.controller.js'
import type UserService from './domain/user.service.js'
import type UserRepository from './data-access/user.repository.js'

declare global {
  type UserManagerController = {
    register: (fastify: FastifyInstance) => Promise<void>
  }

  type UserManagerDI = DI & {
    userController: UserController
    userService: UserService
    userRepository: UserRepository
  }
}

export {}
