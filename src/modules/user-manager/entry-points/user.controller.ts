import UserError from '../domain/user.error.js'
import { userScheme, createUserBody, deleteUserParams } from './user.schema.js'

import type { FastifyInstance, RouteHandlerMethod, RouteShorthandOptions } from 'fastify'

type CreateUserBody = {
  username: string
  email: string
  password: string
}

type DeleteUserParams = {
  userId: string
}

const createUserOptions: RouteShorthandOptions = {
  schema: {
    tags: ['user-manager'],
    body: createUserBody,
    response: {
      201: userScheme
    }
  }
}

const deleteUserOptions: RouteShorthandOptions = {
  schema: {
    tags: ['user-manager'],
    params: deleteUserParams,
    response: {
      200: userScheme
    }
  }
}

class UserController implements UserManagerController {
  private readonly userService: UserManagerDI['userService']

  constructor ({ userService }: UserManagerDI) {
    this.userService = userService
  }

  register = async (fastify: FastifyInstance): Promise<void> => {
    fastify.put('/user/create', createUserOptions, this.handleCreateUserRoute)
    fastify.delete('/user/delete/:userId', deleteUserOptions, this.handleDeleteUserRoute)
  }

  public handleCreateUserRoute: RouteHandlerMethod = async (request, reply) => {
    try {
      const body = request.body as CreateUserBody
      const createdUser = await this.userService.create(body)

      if (!createdUser) return await reply.status(400).send()

      reply.status(201).send(createdUser)
    } catch (error) {
      if (error instanceof UserError) return await reply.status(error.code).send(error.message)

      reply.status(500).send(error)
    }
  }

  public handleDeleteUserRoute: RouteHandlerMethod = async (request, reply) => {
    try {
      const { userId } = request.params as DeleteUserParams
      const deletedUser = await this.userService.delete(userId)

      if (!deletedUser) return await reply.status(400).send()

      reply.status(200).send(deletedUser)
    } catch (error) {
      if (error instanceof UserError) return await reply.status(error.code).send(error.message)

      reply.status(500).send(error)
    }
  }
}

export default UserController
