import { sortRules } from '../../src/lib/utils/sort_rules';
import { Rule } from '../../src/types/models';

describe('sortRules', () => {
  it('sorts rules by rule number', () => {
    const unsorted: Rule[] = [
      {
        id: '2',
        title: 'Regel 10 Test',
        content: '',
        toc: { h2: [] as any }
      },
      {
        id: '1',
        title: 'Regel 2 Test',
        content: '',
        toc: { h2: [] as any }
      },
      { id: '3', title: 'Regel 1 Test', content: '', toc: { h2: [] } }
    ];

    const sorted = sortRules(unsorted);
    const titles = sorted.map((rule) => rule.title);

    expect(titles).toEqual([
      'Regel 1 Test',
      'Regel 2 Test',
      'Regel 10 Test'
    ]);
  });
});
