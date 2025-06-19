import { Warning } from '../../types/response';

export function checkLanguage(language: string): {
  warning: Warning;
} {
  if (language !== 'de') {
    const warning_obj = {
      query: 'language',
      message: `Unsupported language: ${language}. Only 'de' is supported.`
    };

    return { warning: warning_obj };
  }

  return { warning: {} as unknown as Warning };
}
