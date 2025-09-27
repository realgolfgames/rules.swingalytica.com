import rules_params_schema_json from './rules_params_schema';

export const schemas = {
  schemas: {
    rules_params_schema: rules_params_schema_json
  },
  $ref: (id: string) => ({ $ref: `${id}#` })
};
