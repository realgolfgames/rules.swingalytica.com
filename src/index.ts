import env from '@fastify/env';
import Fastify from 'fastify';
import healthRoot from './routes/health';
import rootRoute from './routes/root';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: string;
    };
  }
}

const env_schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: { type: 'string', default: '3000' }
  }
};

const fastify = Fastify({ logger: true });

await fastify.register(env, {
  schema: env_schema,
  dotenv: true
});

await fastify.register(rootRoute).register(healthRoot);

fastify.listen(
  { port: Number(fastify.config.PORT), host: '0.0.0.0' },
  (err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }
);
