import { Rule } from '../../types/models';

export function groupRules(sorted_rules: Rule[]) {
  return [
    {
      title: 'I. Die Grundlagen des Spiels',
      rules: sorted_rules.filter(
        (rule) =>
          rule.title.startsWith('Regel 1 ') ||
          rule.title.startsWith('Regel 2 ') ||
          rule.title.startsWith('Regel 3 ') ||
          rule.title.startsWith('Regel 4 ')
      )
    },
    {
      title: 'II. Spielen der Runde und eines Loches',
      rules: sorted_rules.filter(
        (rule) =>
          rule.title.startsWith('Regel 5 ') ||
          rule.title.startsWith('Regel 6 ')
      )
    },
    {
      title: 'III. Spielen des Balls',
      rules: sorted_rules.filter(
        (rule) =>
          rule.title.startsWith('Regel 7 ') ||
          rule.title.startsWith('Regel 8 ') ||
          rule.title.startsWith('Regel 9 ') ||
          rule.title.startsWith('Regel 10 ') ||
          rule.title.startsWith('Regel 11 ')
      )
    },
    {
      title: 'IV. Sonderregeln für Bunker und Grüns',
      rules: sorted_rules.filter(
        (rule) =>
          rule.title.startsWith('Regel 12 ') ||
          rule.title.startsWith('Regel 13 ')
      )
    },
    {
      title: 'V. Ball aufnehmen und ins Spiel zurückbringen',
      rules: sorted_rules.filter((rule) =>
        rule.title.startsWith('Regel 14 ')
      )
    },
    {
      title: 'VI. Straflose Erleichterung',
      rules: sorted_rules.filter(
        (rule) =>
          rule.title.startsWith('Regel 15 ') ||
          rule.title.startsWith('Regel 16 ')
      )
    },
    {
      title: 'VII. Erleichterung mit Strafe',
      rules: sorted_rules.filter(
        (rule) =>
          rule.title.startsWith('Regel 17 ') ||
          rule.title.startsWith('Regel 18 ') ||
          rule.title.startsWith('Regel 19 ')
      )
    },
    {
      title:
        'VIII. Vorgehensweise für die Spieler und die Spielleitung bei strittigen Fällen der Regelanwendung',
      rules: sorted_rules.filter((rule) =>
        rule.title.startsWith('Regel 20 ')
      )
    },
    {
      title: 'IX. Andere Spielformen',
      rules: sorted_rules.filter(
        (rule) =>
          rule.title.startsWith('Regel 21 ') ||
          rule.title.startsWith('Regel 22 ') ||
          rule.title.startsWith('Regel 23 ') ||
          rule.title.startsWith('Regel 24 ')
      )
    },
    {
      title: 'X. Definitionen',
      rules: sorted_rules.filter(
        (rule) => rule.title === 'Definitionen'
      )
    }
  ];
}
