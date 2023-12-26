import type { FastifyRequest, FastifyReply } from 'fastify'

type GetChatsParams = {
  id: string
}

export const getChatsHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const { id } = request.params as GetChatsParams

  reply.status(200).send(id)
}
