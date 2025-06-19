import env from '@fastify/env';
import Fastify from 'fastify';
import { connectToDB } from './lib/db';
import healthRoot from './routes/health';
import rootRoute from './routes/root';
import rulesRoute from './routes/rules';

const env_schema = {
  type: 'object',
  required: ['PORT', 'MONGODB_URI'],
  properties: {
    PORT: { type: 'string', default: '3000' },
    MONGODB_URI: { type: 'string', default: '' }
  }
};

const fastify = Fastify({ logger: true });

await fastify.register(env, {
  schema: env_schema,
  dotenv: true
});

const connection = await connectToDB(fastify);

if (connection instanceof Error) {
  fastify.log.error(connection);
  process.exit(1);
}

await fastify
  .register(rootRoute)
  .register(healthRoot)
  .register(rulesRoute);

fastify.listen(
  { port: Number(fastify.config.PORT), host: '0.0.0.0' },
  (err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }
);
