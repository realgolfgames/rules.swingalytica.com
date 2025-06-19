import env from '@fastify/env';
import dotenv from 'dotenv';
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

dotenv.config();

const fastify = Fastify({ logger: true });

await fastify.register(env, {
  schema: env_schema,
  dotenv: false
});

const connection = await connectToDB();

if (connection instanceof Error) {
  fastify.log.error(connection);
  process.exit(1);
}

await fastify
  .register(rootRoute)
  .register(healthRoot)
  .register(rulesRoute);

fastify.listen(
  { port: Number(process.env.PORT), host: '0.0.0.0' },
  (err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }
);
