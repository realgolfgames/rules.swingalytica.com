import { FastifyPluginAsync } from 'fastify';

import { rule_model } from '../lib/models';
import { rules_params_schema } from '../lib/schemas/rules_params_schema';
import { schemas } from '../lib/schemas/schemas';

const rulesRoute: FastifyPluginAsync = async (fastify) => {
  for (const schema of Object.values(schemas.schemas)) {
    fastify.addSchema(schema);
  }

  fastify.get('/rules', {
    schema: {
      params: schemas.$ref('RulesParamsSchema')
    },
    handler: async (req, _res) => {
      const params = rules_params_schema.parse(req.params);

      const desired_order = [
        'Regel 1 - Das Spiel, Verhalten der Spieler und die Regeln',
        'Regel 2 - Der Platz',
        'Regel 3 - Das Turnier',
        'Regel 4 - Ausrüstung des Spielers',
        'Regel 5 - Spielen der Runde',
        'Regel 6 - Spielen eines Lochs',
        'Regel 7 - Ballsuchen, Finden und Identifizieren des Balls',
        'Regel 8 - Den Platz spielen, wie er vorgefunden wird',
        'Regel 9 - Ball spielen, wie er liegt, ruhenden Ball aufgenommen oder bewegt',
        'Regel 10 - Auf einen Schlag vorbereiten und diesen ausführen, Beratung und Hilfe, Caddies',
        'Regel 11 - Sich bewegender Ball trifft versehentlich Person, Tier oder Gegenstand: absichtliche Handlungen, um einen sich bewegenden Ball zu beeinflussen',
        'Regel 12 - Bunker',
        'Regel 13 - Grüns',
        'Regel 14 - Vorgehensweisen mit dem Ball - Markieren, Aufnehmen und Reinigen: an Stelle zurücklegen: Droppen im Erleichterungsbereich: Spielen vom falschen Ort',
        'Regel 15 - Erleichterung von losen hinderlichen Naturstoffen und beweglichen Hemmnissen (einschließlich Ball oder Ballmarker, die das Spiel unterstützen oder beeinträchtigen)',
        'Regel 16 - Erleichterung von ungewöhnlichen Platzverhältnissen (einschließlich unbeweglicher Hemmnisse), Gefährdung durch Tiere, eingebetteter Ball',
        'Regel 17 - Penalty Areas',
        'Regel 18 - Erleichterung mit Strafe von Schlag und Distanzverlust, Ball verloren oder Aus, provisorischer Ball',
        'Regel 19 - Ball unspielbar',
        'VIII. Vorgehensweise für die Spieler und die Spielleitung bei strittigen Fällen der Regelanwendung',
        'Regel 20 - Entscheidungen von strittigen Regelfällen während der Runde: Regelentscheidungen durch den Referee und die Spielleitung',
        'Regel 21 - Andere Formen des Einzel-Zählspiels und Einzel-Lochspiels',
        'Regel 22 - Vierer',
        'Regel 23 - Vierball',
        'Regel 24 - Mannschaftsturniere',
        'Definitionen'
      ];

      const skip = params.skip || 0;
      const limit = params.limit;

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
  });
};

export default rulesRoute;
