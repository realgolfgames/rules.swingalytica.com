import { desired_order } from '../const/desired_order';
import { Pipeline } from '../types';

export const pipeline: Pipeline[] = [
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
  { $sort: { sortIndex: 1, title: 1 } }
];
