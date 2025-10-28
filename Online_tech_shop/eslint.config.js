import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser, // браузерные глобалы
        ...globals.vitest,  // vitest-глобалы (describe, it, expect, test, beforeEach, afterEach, vi, и т.д.)
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },

  // отдельный блок для Node-файлов (Tailwind, Vite, ESLint и т.д.)
  {
    files: [
      'tailwind.config.js',
      'vite.config.js',
      'eslint.config.js',
      'postcss.config.js',
    ],
    languageOptions: {
      globals: globals.node,
    },
  },
])


