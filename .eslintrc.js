module.exports = {
  'env': {
    'node': true,
    'jest': true,
  },
  'extends': 'airbnb-base',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'no-console': [
      'error',
      {
        allow: [
          'log',
          'warn',
          'error'
        ]
      }
    ],
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-underscore-dangle': 'off',
    'object-curly-newline': ['error', {
        'ObjectExpression': { 'multiline': true },
        'ObjectPattern': { 'multiline': true },
        'ImportDeclaration': { 'multiline': true, 'minProperties': 3 },
        'ExportDeclaration': { 'multiline': true, 'minProperties': 3 }
    }]
  }
}
