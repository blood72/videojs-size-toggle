module.exports = {
  'env': {
    'es6': true,
    'node': true,
  },
  'ignorePatterns': ['dist/**/*'],
  'parser': '@typescript-eslint/parser',
  'plugins': [
    '@typescript-eslint',
  ],
  'extends': [
    'eslint:recommended',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  'rules': {
    'max-len': ['error', { 'code': 120 }],
    'object-curly-spacing': ['error', 'always'],
    'operator-linebreak': ['error', 'before'],
    'require-jsdoc': 0,
    'space-before-function-paren': 0,
  },
};
