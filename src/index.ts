import Fastify from 'fastify'

import env from '#shared/configs/env.js'

const fastify = Fastify({
  logger: true
})

fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

try {
  fastify.listen({ port: env.PORT })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
