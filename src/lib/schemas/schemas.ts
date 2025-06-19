import { buildJsonSchemas } from 'fastify-zod';
import { rules_query_schema } from './rules_query_schema';

export const schemas = buildJsonSchemas(
  { RulesQuerySchema: rules_query_schema },
  { $id: 'RulesQuerySchema' }
);
