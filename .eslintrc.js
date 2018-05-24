module.exports = {
  extends: [
    'standard',
    'prettier',
    'prettier/standard'
  ],
  plugins: ['mocha', 'prettier', 'standard'],
  parserOptions: { sourceType: 'module' },
  env: { es6: true, node: true },
  globals: { fetch: true, Headers: true },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, semi: false }]
  }
}
