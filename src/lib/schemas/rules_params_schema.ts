import { z } from 'zod';

export const rules_params_schema = z.object({
  limit: z.coerce.number().int().min(1).max(25).default(25),
  skip: z.coerce.number().int().min(0).max(25).default(0),
  grouped: z.string().optional().default('false'),
  language: z.string().optional().default('en'),
  id: z.coerce.number().int().max(25).optional()
});
