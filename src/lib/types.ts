import { desired_order } from './const/desired_order';

export type Params = {
  limit: number;
  skip: number;
  grouped: string;
  language: string;
  id?: number | undefined;
};

export type Pipeline = {
  $set?: {
    sortIndex: {
      $indexOfArray?: [typeof desired_order, '$title'];
      $cond?: [{ $lt: ['$sortIndex', 0] }, 9999, '$sortIndex'];
    };
  };
  $sort?: { sortIndex: number; title: number };
  $skip?: number;
  $limit?: number;
};
