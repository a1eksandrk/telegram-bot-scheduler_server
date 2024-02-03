import assert from 'node:assert'
import { describe, test } from 'node:test'

import { buildWhereParams } from './query.js'

describe('QueryLib', () => {
  test('buildWhereParams should return correct where params', async t => {
    await t.test('with string value', () => {
      const actual = buildWhereParams('bots', 'botId', '42')
      const expected = ['bots.botId = :botId', { botId: '42' }]

      assert.deepEqual(actual, expected)
    })

    await t.test('with number value', () => {
      const actual = buildWhereParams('bots', 'botId', 42)
      const expected = ['bots.botId = :botId', { botId: 42 }]

      assert.deepEqual(actual, expected)
    })
  })

  test('buildWhereParams should return correct where params with empty value', async t => {
    await t.test('with undefined', () => {
      const actual = buildWhereParams('bots', 'botId')
      const expected = ['', { botId: undefined }]

      assert.deepEqual(actual, expected)
    })

    await t.test('with null', () => {
      const actual = buildWhereParams('bots', 'botId', null)
      const expected = ['', { botId: null }]

      assert.deepEqual(actual, expected)
    })
  })
})
