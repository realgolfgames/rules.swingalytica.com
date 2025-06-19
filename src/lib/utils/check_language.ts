import { warning } from '../../types/response';

export function checkLanguage(language: string): {
  warning: warning;
} {
  const warningObj: warning = {
    query: 'language',
    message: ''
  };

  if (language !== 'de') {
    warningObj.message = `${language} is currently not supported. Only 'de' is available.`;
  }

  return { warning: warningObj };
}
