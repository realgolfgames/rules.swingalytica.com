// src/routes/rules.ts
import { FastifyPluginAsync } from 'fastify';
import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';
import { rule_model } from '../lib/models';
import { groupRules } from '../lib/utils/group_rules';
import { Rule } from '../types/models';

const RulesQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(25),
  skip: z.coerce.number().int().min(0).default(0),
  grouped: z.string().optional().default('true')
});

const schemas = buildJsonSchemas(
  { RulesQuerySchema },
  { $id: 'RulesQuerySchema' }
);

const rulesRoute: FastifyPluginAsync = async (fastify) => {
  for (const schema of Object.values(schemas.schemas)) {
    fastify.addSchema(schema);
  }

  fastify.get('/rules', {
    // schema: {
    //   querystring: schemas.$ref('RulesQuerySchema'),
    //   response: rules_response_schema
    // },
    handler: async (req, res) => {
      const { limit, skip, grouped } = RulesQuerySchema.parse(
        req.query
      );

      const rules = await rule_model
        .find()
        .sort({ order: 1 })
        .skip(skip)
        .limit(limit)
        .lean();

      if (grouped === 'true') {
        const grouped_rules = groupRules(rules as Rule[]);

        return {
          data: grouped_rules,
          returned: rules.length,
          total: await rule_model.countDocuments()
        };
      }

      return {
        data: rules,
        returned: rules.length,
        total: await rule_model.countDocuments()
      };
    }
  });
};

export default rulesRoute;
