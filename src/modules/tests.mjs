import plugin from '@vitest/eslint-plugin';
import globals from 'globals';

import { predicate } from '../utils/conditions.mjs';
import { globs } from '../utils/globs.mjs';

/**
 * @param { import('..').Options } options
 * @return { import('eslint').Linter.Config }
 */
function tests(options = {}) {
  return {
    plugins: { vitest: plugin },
    files: [...globs.test, ...globs.e2e],
    languageOptions: {
      globals: { ...globals['shared-node-browser'], ...globals.jest },
    },
    rules: {
      'vitest/padding-around-after-all-blocks': 'warn',
      'vitest/padding-around-after-each-blocks': 'warn',
      'vitest/padding-around-before-all-blocks': 'warn',
      'vitest/padding-around-before-each-blocks': 'warn',
      'vitest/padding-around-describe-blocks': 'warn',
      'vitest/padding-around-expect-groups': 'warn',
      'vitest/padding-around-test-blocks': 'warn',

      'max-lines-per-function': 'off',
      'no-sparse-arrays': 'off',
      'no-empty-function': 'off',

      ...predicate(options.react, {
        'react/jsx-no-constructed-context-values': 'off',
      }),

      ...predicate(options.typescript, {
        '@typescript-eslint/method-signature-style': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/prefer-promise-reject-errors': 'off',
      }),
    },
  };
}

export default tests;
