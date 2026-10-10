// libraries
import { fileURLToPath } from "url";
import path from "path";
import prettierConfig from "eslint-config-prettier";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({ resolvePluginsRelativeTo: __dirname });

export default [
  {
    ignores: ["node_modules/**", "dist/**", "build/**", "coverage/**", "jest-cache/**"],
  },
  {
    files: ["**/*.js", "**/*.ts"],
    languageOptions: {
      globals: {
        DEVELOPMENT: true,
        Polymer: true,
        PolymerElement: true,
        window: true,
        localStorage: true,
        top: true,
        Ucs: true,
      },
    },
    rules: {
      ...prettierConfig.rules,
      "import/no-relative-packages": "off",
      "spaced-comment": "off",
      "import/no-cycle": "off",
      "no-multiple-empty-lines": "warn",
      "no-undef": "error",
      "no-console": "off",
      "import/no-extraneous-dependencies": "off",
      "func-names": "off",
      "no-plusplus": "off",
    },
  },
  ...compat.config({
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: ["plugin:@typescript-eslint/recommended"],
    rules: {
      "no-undef": "off",
      "react/display-name": "off",
      "react/prop-types": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/no-explicit-any": ["off"],
      "@typescript-eslint/no-var-requires": 0,
      "@typescript-eslint/no-require-imports": ["off"],
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowTernary: true, allowShortCircuit: true },
      ],
    },
  }),
];
