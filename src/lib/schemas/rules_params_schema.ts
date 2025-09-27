import { z } from 'zod';

export const rules_params_schema = z.object({
  limit: z.coerce.number().int().min(1).max(25).default(25),
  skip: z.coerce.number().int().min(0).max(25).default(0),
  grouped: z.string().optional().default('false'),
  language: z.string().optional().default('de'),
  id: z.coerce.number().int().max(25).optional()
});

export const rules_params_schema_json = {
  $id: 'RulesParamsSchema',
  type: 'object',
  properties: {
    limit: { type: 'integer', minimum: 1, maximum: 25, default: 25 },
    skip: { type: 'integer', minimum: 0, maximum: 25, default: 0 },
    grouped: { type: 'string', default: 'false' },
    language: { type: 'string', default: 'de' },
    id: { type: 'integer', maximum: 25 }
  },
  additionalProperties: false
};
export default rules_params_schema_json;
