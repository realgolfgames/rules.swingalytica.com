import { FastifyPluginAsync } from 'fastify';
import { rule_model } from '../lib/models';
import { flat_rules_response_schema } from '../lib/schemas/flat_rules_response_schema';
import { grouped_rules_response_schema } from '../lib/schemas/grouped_rules_response_schema';
import { rules_query_schema } from '../lib/schemas/rules_query_schema';
import { schemas } from '../lib/schemas/schemas';
import { checkLanguage } from '../lib/utils/check_language';
import { groupRules } from '../lib/utils/group_rules';
import { Rule } from '../types/models';
import { warning } from '../types/response';

const rulesRoute: FastifyPluginAsync = async (fastify) => {
  for (const schema of Object.values(schemas.schemas)) {
    fastify.addSchema(schema);
  }

  fastify.get('/rules', {
    schema: {
      querystring: schemas.$ref('RulesQuerySchema')
    },
    handler: async (req, _res) => {
      const warnings: warning[] = [];
      const { limit, skip, grouped, language, id } =
        rules_query_schema.parse(req.query);

      warnings.push(checkLanguage(language).warning);

      const query: { order?: number } = id ? { order: id } : {};

      const rules = await rule_model
        .find(query)
        .sort({ order: 1 })
        .skip(skip)
        .limit(limit)
        .lean();

      const data =
        grouped === 'true' ? groupRules(rules as Rule[]) : rules;

      const response_body = {
        data,
        warnings,
        returned: rules.length,
        total: await rule_model.countDocuments()
      };

      try {
        if (grouped === 'true') {
          grouped_rules_response_schema.parse(response_body);
        } else {
          flat_rules_response_schema.parse(response_body);
        }
      } catch (err) {
        _res.status(500).send({
          error: 'Internal Server Error – Invalid response schema',
          details: err
        });
        return;
      }

      return response_body;
    }
  });
};

export default rulesRoute;
