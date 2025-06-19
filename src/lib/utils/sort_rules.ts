import { Rule } from '../../types/models';

export function sortRules(rules: Rule[]): Rule[] {
  return rules.toSorted((a, b) => {
    const num_a = parseInt(
      RegExp(/\d+/).exec(a.title)?.[0] ?? '0',
      10
    );
    const num_b = parseInt(
      RegExp(/\d+/).exec(b.title)?.[0] ?? '0',
      10
    );
    return num_a - num_b;
  });
}
