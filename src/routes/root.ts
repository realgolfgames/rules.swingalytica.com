import { FastifyPluginAsync } from 'fastify';
import pkg from '../../package.json';

const rootRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async () => ({
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
    repository: pkg.repository,
    license: pkg.license,
    docs: 'https://realgolf.games/developer/docs',
    status: 200
  }));
};

export default rootRoute;
