import type { JSONSchema7 } from 'json-schema'

export const chatScheme: JSONSchema7 = {
  type: 'object',
  properties: {
    chatId: { type: 'string' },
    name: { type: 'string' },
    image: { type: ['string', 'null'], default: null }
  }
}

export const paramsScheme: JSONSchema7 = {
  type: 'object',
  required: ['chatId'],
  properties: {
    chatId: { type: 'string' }
  }
}

export const querystringScheme: JSONSchema7 = {
  type: 'object',
  required: ['botId'],
  properties: {
    botId: { type: ['string'] }
  }
}
