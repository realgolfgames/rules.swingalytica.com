import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintComments from 'eslint-plugin-eslint-comments';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    ignores: [
      '**/.DS_Store',
      '**/node_modules',
      '**/build',
      '**/.env*',
      '!**/.env.example',
      '**/pnpm-lock.yaml',
      '**/package-lock.json',
      '**/yarn.lock',
      'coverage',
      '**/__mocks__',
      '**/*.config.*',
      '**/e2e/**'
    ]
  },

  // 🔹 JS Rules
  js.configs.recommended,

  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },

  // 🔹 TS Support
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'eslint-comments': eslintComments
    },
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['snake_case', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          filter: {
            regex:
              '^(__filename|__dirname|GET|POST|DELETE|PATCH|PUT|OPTIONS|HEAD|__VERSION__)$',
            match: false
          }
        },
        { selector: 'function', format: ['camelCase'] },
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'enumMember', format: ['UPPER_CASE'] },
        { selector: 'interface', format: ['PascalCase'] },
        {
          selector: 'parameter',
          format: ['camelCase', 'snake_case'],
          leadingUnderscore: 'allow'
        }
      ],
      quotes: ['error', 'single', { avoidEscape: true }],
      'no-useless-escape': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'eslint-comments/no-use': ['error', { allow: [] }],
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  }
];
