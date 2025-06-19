// src/routes/rules.ts
import { FastifyPluginAsync } from 'fastify';
import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';
import { rule_model } from '../lib/models';
import { groupRules } from '../lib/utils/group_rules';
import { Rule } from '../types/models';

const rules_query_schema = z.object({
  limit: z.coerce.number().int().min(1).max(25).default(25),
  skip: z.coerce.number().int().min(0).max(25).default(0),
  grouped: z.string().optional().default('true'),
  language: z.string().optional().default('de')
});

const schemas = buildJsonSchemas(
  { RulesQuerySchema: rules_query_schema },
  { $id: 'RulesQuerySchema' }
);

const rulesRoute: FastifyPluginAsync = async (fastify) => {
  for (const schema of Object.values(schemas.schemas)) {
    fastify.addSchema(schema);
  }

  fastify.get('/rules', {
    schema: {
      querystring: schemas.$ref('RulesQuerySchema')
      // response: rules_response_schema
    },
    handler: async (req, _res) => {
      const warnings: { query: string; message: string }[] = [];
      const { limit, skip, grouped, language } =
        rules_query_schema.parse(req.query);

      // FIXME: Currently, we only support the German language.
      // This should be removed once we support more languages.
      const current_language = 'de';

      if (language !== current_language) {
        warnings.push({
          query: 'language',
          message: `${language} is currently not supported, we currently only support the German language. We are working on adding more languages in the future.`
        });
      }

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
          warnings,
          returned: rules.length,
          total: await rule_model.countDocuments()
        };
      }

      return {
        data: rules,
        warnings,
        returned: rules.length,
        total: await rule_model.countDocuments()
      };
    }
  });
};

export default rulesRoute;
