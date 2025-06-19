import z from 'zod';

export const rules_response_schema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  toc: z.object({
    h2: z.array(
      z.object({
        id: z.string(),
        text: z.string(),
        h3: z
          .array(
            z.object({
              id: z.string(),
              text: z.string()
            })
          )
          .optional()
      })
    )
  })
});
