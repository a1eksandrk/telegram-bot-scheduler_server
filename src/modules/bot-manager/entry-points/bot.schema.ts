import type { JSONSchema7 } from 'json-schema'

export const botScheme: JSONSchema7 = {
  type: 'object',
  properties: {
    botId: { type: 'number' },
    token: { type: 'string' }
  }
}

export const connectBotBody: JSONSchema7 = {
  type: 'object',
  required: ['token'],
  properties: {
    botId: { type: 'number' },
    token: { type: 'string' }
  }
}
