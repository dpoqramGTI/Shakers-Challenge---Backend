import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    rules: {
      semi: ["error", "always"], // punto y coma obligatorio
      quotes: ["error", "double"], // comillas dobles
      "prefer-arrow-callback": "error",
      "prefer-const": "error",
      "prefer-template": "error",

      // Reglas compatibles con Prettier config
      "comma-dangle": ["error", "always-multiline"], // comas finales en multilínea
      "arrow-parens": ["error", "always"], // paréntesis siempre en arrow functions
      "indent": ["error", 2, { "SwitchCase": 1 }], // indentación de 2 espacios, indent switch case 1 nivel
      "no-tabs": "error", // prohibir tabs (usar espacios)
      "object-curly-spacing": ["error", "always"], // espacios dentro de llaves
      "eol-last": ["error", "always"], // nueva línea al final del archivo
      "template-curly-spacing": ["error", "never"], // sin espacios en template strings ${...}
    },
  }),
];

export default eslintConfig;
