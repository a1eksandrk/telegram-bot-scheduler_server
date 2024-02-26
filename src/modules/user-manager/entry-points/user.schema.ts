import type { JSONSchema7 } from 'json-schema'

export const userScheme: JSONSchema7 = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    username: { type: 'string' },
    email: { type: 'string', format: 'email' }
  }
}

export const createUserBody: JSONSchema7 = {
  type: 'object',
  required: ['username', 'email', 'password'],
  properties: {
    username: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string' }
  }
}

export const deleteUserParams: JSONSchema7 = {
  type: 'object',
  required: ['userId'],
  properties: {
    userId: { type: 'string' }
  }
}
