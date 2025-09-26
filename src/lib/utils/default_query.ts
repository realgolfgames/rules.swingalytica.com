import { desired_order } from '../const/desired_order';
import { rule_model } from '../models';
import { Params } from '../types';

export async function defaultQuery(params: Params) {
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
          $cond: [{ $lt: ['$sortIndex', 0] }, 9999, '$sortIndex']
        }
      }
    },
    { $sort: { sortIndex: 1, title: 1 } },
    { $skip: skip },
    { $limit: limit }
  ];

  if (limit != null) pipeline.push({ $limit: limit });

  const rules = await rule_model.aggregate(pipeline).exec();

  return { rules };
}
