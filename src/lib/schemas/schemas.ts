import { buildJsonSchemas } from 'fastify-zod';
import { rules_params_schema } from './rules_params_schema';

export const schemas = buildJsonSchemas(
  { RulesParamsSchema: rules_params_schema },
  { $id: 'RulesParamsSchema' }
);
