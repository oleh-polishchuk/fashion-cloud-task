module.exports = {
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'standard',
    'plugin:jest/recommended',
    'plugin:security/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['jest', 'security', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {},
};
