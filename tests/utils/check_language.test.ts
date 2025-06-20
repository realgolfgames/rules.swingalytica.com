import { checkLanguage } from '../../src/lib/utils/check_language';
import { Warning } from '../../src/types/response';

describe('checkLanguage', () => {
  it("should return an empty warning for language 'de'", () => {
    const warnings: Warning[] = [];
    warnings.push(checkLanguage('de').warning);
    expect(warnings).toEqual([{}]);
  });

  it("should return a warning for unsupported language 'en'", () => {
    const warnings: Warning[] = [];
    warnings.push(checkLanguage('en').warning);
    expect(warnings).toEqual([
      {
        query: 'language',
        message: "Unsupported language: en. Only 'de' is supported."
      }
    ]);
  });

  it("should return a warning for unsupported language 'fr'", () => {
    const warnings: Warning[] = [];
    warnings.push(checkLanguage('fr').warning);
    expect(warnings).toEqual([
      {
        query: 'language',
        message: "Unsupported language: fr. Only 'de' is supported."
      }
    ]);
  });

  it('should handle empty string as unsupported language', () => {
    const warnings: Warning[] = [];
    warnings.push(checkLanguage('').warning);
    expect(warnings).toEqual([
      {
        query: 'language',
        message: "Unsupported language: . Only 'de' is supported."
      }
    ]);
  });

  it('should handle two warnings for different languages', () => {
    const warnings: Warning[] = [];
    warnings.push(checkLanguage('en').warning);
    warnings.push(checkLanguage('fr').warning);
    expect(warnings).toEqual([
      {
        query: 'language',
        message: "Unsupported language: en. Only 'de' is supported."
      },
      {
        query: 'language',
        message: "Unsupported language: fr. Only 'de' is supported."
      }
    ]);
  });
});
