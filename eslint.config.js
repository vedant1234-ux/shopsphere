import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

export default [
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...compat.extends("plugin:react/recommended"),
    ...compat.extends("plugin:react-hooks/recommended"),
    {
        plugins: {
            react: pluginReact,
            "react-hooks": pluginReactHooks,
        },
    },
    {
        settings: {
            react: {
                version: "detect",
            },
            "import/resolver": {
                typescript: true,
                node: true,
            },
        },
    },
    {
        rules: {
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
            "react-hooks/exhaustive-deps": "warn",
        },
    },
]; 