// src/routes/rules.ts
import { FastifyPluginAsync } from 'fastify';
import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';
import { rule_model } from '../lib/models';
import { rules_response_schema } from '../lib/schemas/rules_response_schema';
import { groupRules } from '../lib/utils/group_rules';
import { sortRules } from '../lib/utils/sort_rules';
import { Rule } from '../types/models';

const RulesQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(10),
  skip: z.coerce.number().int().min(0).default(0)
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
    schema: {
      querystring: schemas.$ref('RulesQuerySchema'),
      response: rules_response_schema
    },
    handler: async (req, res) => {
      const { limit, skip } = RulesQuerySchema.parse(req.query);

      const rules = await rule_model
        .find()
        .skip(skip)
        .limit(limit)
        .lean();

      const sorted_rules = sortRules(rules as Rule[]);

      const grouped_rules = groupRules(sorted_rules);

      return {
        data: grouped_rules,
        total: await rule_model.countDocuments()
      };
    }
  });
};

export default rulesRoute;
