import { FastifyPluginAsync } from 'fastify';

const healthRoot: FastifyPluginAsync = async (fastify) => {
  fastify.get('/health', async () => ({
    message: 'Service is healthy',
    status: 200
  }));
};

export default healthRoot;
