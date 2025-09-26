import { FastifyPluginAsync } from 'fastify';
import { connectToDB } from '../lib/db';

const healthRoot: FastifyPluginAsync = async (fastify) => {
  fastify.get('/health', async (request, reply) => {
    const connection = connectToDB();

    if (connection instanceof Error) {
      reply.status(500).send({
        message: 'Service is unhealthy',
        status: 500
      });
      return;
    }

    reply.status(200).send({
      message: 'Service is healthy',
      status: 200
    });
  });
};

export default healthRoot;
