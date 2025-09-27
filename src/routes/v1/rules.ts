import { FastifyPluginAsync } from 'fastify';
import { PipelineStage } from 'mongoose';
import { HttpError } from '../../lib/class/HttpError';
import { default_params } from '../../lib/const/default_params';
import { rule_model } from '../../lib/models';
import { rules_params_schema } from '../../lib/schemas/rules_params_schema';
import { schemas } from '../../lib/schemas/schemas';
import { Params } from '../../lib/types';
import { defaultQuery } from '../../lib/utils/default_query';
import { getIsDefault } from '../../lib/utils/get_id_default';
import { groupRules } from '../../lib/utils/group_rules';
import { pipeline } from '../../lib/utils/pipeline';
import { Rule } from '../../types/models';

const rulesRoute: FastifyPluginAsync = async (fastify) => {
  for (const schema of Object.values(schemas.schemas)) {
    fastify.addSchema(schema);
  }

  fastify.get('/v1/rules', {
    schema: {
      querystring: schemas.$ref('RulesParamsSchema')
    },
    handler: async (req, _res) => {
      const parsed = rules_params_schema.safeParse(req.query);

      if (!parsed.success) {
        throw new HttpError(
          `Invalid query parameters: ${JSON.stringify(parsed.error.issues[0].message)}`,
          400
        );
      }

      const params: Params = parsed.data;
      const is_default = getIsDefault(params, default_params);

      if (is_default) {
        return await defaultQuery(params);
      } else if (params.grouped === 'true') {
        const rules = await rule_model
          .aggregate(pipeline as PipelineStage[])
          .exec();

        const grouped_rules = groupRules(rules as Rule[]);

        return { grouped_rules };
      } else {
        const skip = params.skip || 0;
        const { limit } = params;

        if (pipeline.find((stage) => stage.$skip != null)) {
          pipeline.splice(
            pipeline.findIndex((stage) => stage.$skip != null),
            1
          );
        }

        if (pipeline.find((stage) => stage.$limit != null)) {
          pipeline.splice(
            pipeline.findIndex((stage) => stage.$limit != null),
            1
          );
        }

        if (skip != null) pipeline.push({ $skip: skip });
        if (limit != null) pipeline.push({ $limit: limit });

        const rules = await rule_model
          .aggregate(pipeline as PipelineStage[])
          .exec();

        return { rules };
      }
    }
  });
};

export default rulesRoute;
