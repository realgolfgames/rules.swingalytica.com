import { FastifyPluginAsync } from 'fastify';
import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';
import { rule_model } from '../lib/models';
import { groupRules } from '../lib/utils/group_rules';
import { Rule } from '../types/models';

const rules_query_schema = z.object({
  limit: z.coerce.number().int().min(1).max(25).default(25),
  skip: z.coerce.number().int().min(0).max(25).default(0),
  grouped: z.string().optional().default('false'),
  language: z.string().optional().default('de'),
  id: z.coerce.number().int().max(25).optional()
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
      const { limit, skip, grouped, language, id } =
        rules_query_schema.parse(req.query);

      // FIXME: Add support for other languages in the future
      if (language !== 'de') {
        warnings.push({
          query: 'language',
          message: `${language} is currently not supported. Only 'de' is available.`
        });
      }

      const query: { order?: number } = id ? { order: id } : {};

      const rules = await rule_model
        .find(query)
        .sort({ order: 1 })
        .skip(skip)
        .limit(limit)
        .lean();

      const data =
        grouped === 'true' ? groupRules(rules as Rule[]) : rules;

      return {
        data,
        warnings,
        returned: rules.length,
        total: await rule_model.countDocuments()
      };
    }
  });
};

export default rulesRoute;
