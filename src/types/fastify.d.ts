import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: string;
      MONGODB_URI: string;
    };
  }
}
