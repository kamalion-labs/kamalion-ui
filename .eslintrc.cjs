module.exports = {
  env: { browser: true, es2020: true },
  extends: ["@rocketseat/eslint-config/react"],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh"],
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "react-refresh/only-export-components": "warn",
    "react/display-name": "off",
    "prettier/prettier": [
      "error",
      {
        semi: true,
        endOfLine: "lf",
      },
    ],
  },
};
