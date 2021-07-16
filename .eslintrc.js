module.exports = {
  extends: ['airbnb-base', 'plugin:vue/recommended'], // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base
  rules: {
    // https://github.com/airbnb/javascript/blob/b6fc6dc7c3cb76497db0bb81edaa54d8f3427796/packages/eslint-config-airbnb-base/rules/style.js
    'no-console': 'off',
    'max-len': ['error', 200, 2],
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'global-require': 'off',
    'import/named': 'off',
    'import/no-dynamic-require': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        vue: 'never'
      }
    ],
    // @路径
    'import/no-unresolved': [2, { ignore: ['@'] }],
    // watch时的匿名函数
    'func-names': [0, 'never'],
    'linebreak-style': 'off',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'node_modules/@vue/cli-service/webpack.config.js'
      }
    }
  },
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true
    },
    parser: 'babel-eslint'
  }
};
