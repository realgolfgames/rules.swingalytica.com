import z from 'zod';
import { rules_response_schema } from './rules_response_schema';
import { warnings_schema } from './warnings_schema';

export const flat_rules_response_schema = z.object({
  data: z.array(rules_response_schema),
  total: z.number(),
  returned: z.number(),
  warnings: warnings_schema.optional()
});
