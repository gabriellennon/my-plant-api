import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
const { randomUUID } = require('crypto');

export async function userRoute(app: FastifyInstance){
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/user', async (request) => {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: request.user.sub
      }
    })

    return userInfo
  })

  app.delete('/user/:userId', async (request, reply) => {

    const paramsSchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = paramsSchema.parse(request.params)

    try {
      await prisma.$transaction([
        prisma.plant_User.deleteMany({
          where: {
            userId: userId,
          },
        }),
        prisma.user.delete({
          where: {
            id: userId
          }
        })
  
      ])

      reply.status(200).send({ message: 'Usuário foi deletado com sucesso!' });
    } catch (error) {
      request.log.error(error);
      reply.status(500).send({ error: 'Falha ao excluir o usuário, tente novamente.' });
    }
  })   
}