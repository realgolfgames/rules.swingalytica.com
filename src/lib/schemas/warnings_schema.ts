import z from 'zod';

export const warnings_schema = z
  .array(
    z
      .object({
        query: z.string().optional(),
        message: z.string().optional()
      })
      .optional()
  )
  .optional();
