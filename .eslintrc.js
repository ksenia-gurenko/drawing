module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'simple-import-sort',
    'prettier'
  ],
  rules: {
    // TypeScript правила
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { 
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_'
    }],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    
    // Импорты
    'import/no-unresolved': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Node.js builtins
          ['^node:'],
          // Пакеты
          ['^@?\\w'],
          // Внутренние пути
          ['^(@components|@utils|@types)(/.*|$)'],
          // Родительские импорты
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Текущая директория
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Стили
          ['^.+\\.s?css$']
        ]
      }
    ],
    'simple-import-sort/exports': 'error',
    
    // Общие правила
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'prefer-const': 'error',
    'eqeqeq': ['error', 'always'],
    
    // Prettier
    'prettier/prettier': [
      'error',
      {
        'endOfLine': 'auto'
      }
    ]
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      }
    }
  },
  ignorePatterns: [
    'dist',
    'node_modules',
    '*.js',
    '*.d.ts',
    '*.config.js'
  ]
};