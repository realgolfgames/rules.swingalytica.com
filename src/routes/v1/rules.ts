import { FastifyPluginAsync } from 'fastify';
import { HttpError } from '../../lib/class/HttpError';
import { default_params } from '../../lib/const/default_params';
import { desired_order } from '../../lib/const/desired_order';
import { rule_model } from '../../lib/models';
import { rules_params_schema } from '../../lib/schemas/rules_params_schema';
import { schemas } from '../../lib/schemas/schemas';
import { Params } from '../../lib/types';
import { defaultQuery } from '../../lib/utils/default_query';
import { getIsDefault } from '../../lib/utils/get_id_default';

const rulesRoute: FastifyPluginAsync = async (fastify) => {
  for (const schema of Object.values(schemas.schemas)) {
    fastify.addSchema(schema);
  }

  fastify.get('/v1/rules', {
    schema: {
      params: schemas.$ref('RulesParamsSchema')
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
      } else {
        const skip = params.skip || 0;
        const { limit } = params;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pipeline: any[] = [
          {
            $set: {
              sortIndex: { $indexOfArray: [desired_order, '$title'] }
            }
          },
          {
            $set: {
              sortIndex: {
                $cond: [
                  { $lt: ['$sortIndex', 0] },
                  9999,
                  '$sortIndex'
                ]
              }
            }
          },
          { $sort: { sortIndex: 1, title: 1 } },
          { $skip: skip }
        ];

        if (limit != null) pipeline.push({ $limit: limit });

        const rules = await rule_model.aggregate(pipeline).exec();

        return { rules };
      }
    }
  });
};

export default rulesRoute;
