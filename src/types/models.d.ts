import mongoose from 'mongoose';
import { rule_model } from '../lib/models';

export type Rule =
  typeof rule_model extends mongoose.Model<infer rule_model>
    ? rule_model
    : never;
