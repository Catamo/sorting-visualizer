module.exports = {
  root: true,
  plugins: ["cypress"],
  env: {
    node: true,
    mocha: true,
    "cypress/globals": true
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  rules: {
    strict: "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
