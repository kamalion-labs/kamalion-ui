module.exports = {
  env: { browser: true, es2020: true },
  extends: ["@kamalion/eslint-config/react"],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh"],
  rules: {
    "react/no-unknown-property": "off",
  },
};
