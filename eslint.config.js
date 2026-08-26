// @ts-check
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const playwright = require('eslint-plugin-playwright');
const prettier = require('eslint-config-prettier');
const globals = require('globals');

module.exports = tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['tests/**/*.ts', 'playwright.config.ts'],
    plugins: { playwright },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
    },
  },
  {
    files: ['eslint.config.js'],
    languageOptions: { globals: globals.node },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  prettier,
  {
    ignores: [
      'node_modules/',
      'playwright-report/',
      'allure-results/',
      'allure-report/',
      'test-results/',
      'playwright/.auth/',
    ],
  },
);
