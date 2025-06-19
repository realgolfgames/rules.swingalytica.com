import { groupRules } from '../../src/lib/utils/group_rules';
import { Rule } from '../../src/types/models';

describe('groupRules', () => {
  it('groups rules correctly based on title prefixes', () => {
    const mockRules: Rule[] = [
      {
        title: 'Regel 1 Golf',
        id: '1',
        content: '',
        toc: { h2: [] as any }
      },
      {
        title: 'Regel 5 Spiel',
        id: '5',
        content: '',
        toc: { h2: [] as any }
      },
      {
        title: 'Regel 13 Grün',
        id: '13',
        content: '',
        toc: { h2: [] as any }
      },
      {
        title: 'Definitionen',
        id: 'def',
        content: '',
        toc: { h2: [] as any }
      }
    ];

    const grouped = groupRules(mockRules);
    const titles = grouped.map((group) => group.title);

    expect(titles).toContain('I. Die Grundlagen des Spiels');
    expect(titles).toContain(
      'II. Spielen der Runde und eines Loches'
    );
    expect(titles).toContain('IV. Sonderregeln für Bunker und Grüns');
    expect(titles).toContain('X. Definitionen');

    const grundlagen = grouped.find(
      (g) => g.title === 'I. Die Grundlagen des Spiels'
    );
    expect(grundlagen?.rules.length).toBe(1);
    expect(grundlagen?.rules[0].title).toBe('Regel 1 Golf');
  });
});
