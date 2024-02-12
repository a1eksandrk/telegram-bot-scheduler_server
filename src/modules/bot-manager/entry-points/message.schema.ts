import type { JSONSchema7 } from 'json-schema'

export const messageSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    messageId: { type: 'string' },
    text: { type: 'string' },
    timestamp: { type: 'string', format: 'date-time' }
  }
}

export const addBodySchema: JSONSchema7 = {
  type: 'object',
  required: ['text', 'timestamp', 'botId', 'chatId'],
  properties: {
    text: { type: 'string' },
    timestamp: { type: 'string', format: 'date-time' },
    botId: { type: 'string' },
    chatId: { type: 'string' }
  }
}

export const updateBodySchema: JSONSchema7 = {
  type: 'object',
  properties: {
    text: { type: 'string' },
    timestamp: { type: 'string', format: 'date-time' }
  }
}

export const querystringScheme: JSONSchema7 = {
  type: 'object',
  properties: {
    botId: { type: ['string', 'null'], default: null },
    chatId: { type: ['string', 'null'], default: null }
  }
}

export const paramsSchema: JSONSchema7 = {
  type: 'object',
  required: ['messageId'],
  properties: {
    messageId: { type: 'string' }
  }
}
