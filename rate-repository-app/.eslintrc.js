module.exports = {
  extends: [
    "universe/native",
    "plugin:react-native-a11y/all",
    "plugin:jest/recommended",
  ],
  overrides: [
    {
      files: ["*.{ts,tsx}"],
      processor: "@graphql-eslint/graphql",
      extends: ["plugin:prettier/recommended"],
    },
    {
      files: ["*.graphql"],
      parser: "@graphql-eslint/eslint-plugin",
      plugins: ["@graphql-eslint"],
      rules: {
        "prettier/prettier": "error",
      },
    },
  ],
  ignorePatterns: ["/**/__generated__/"],
};
