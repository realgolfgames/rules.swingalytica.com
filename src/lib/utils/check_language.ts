import { warning } from '../../types/response';

export function checkLanguage(language: string): {
  warning: warning;
} {
  if (language !== 'de') {
    const warningObj = {
      query: 'language',
      message: `Unsupported language: ${language}. Only 'de' is supported.`
    };

    return { warning: warningObj };
  }

  return { warning: {} as unknown as warning };
}
