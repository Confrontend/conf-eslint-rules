import { RuleTester } from "@typescript-eslint/utils/dist/eslint-utils";
import rule from "./a-element-target-blank-rel-noopener-noreferrer";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run(
  "a-element-target-blank-rel-noopener-noreferrer.test",
  rule as any,
  {
    valid: [
      {
        code: '<a href="/" rel="noopener noreferrer" target="_blank">Link</a>',
      },
      {
        code: '<a href="/" rel="noopener noreferrer">Link</a>',
      },
      {
        code: '<a href="/">Link</a>',
      },
      {
        code: '<a href="/" target="_blank" rel="noopener noreferrer">Link</a>',
      },
      {
        code: '<a href="/" target="_self">Link</a>',
      },
    ],
    invalid: [
      {
        code: '<a href="/" target="_blank">Link</a>',
        errors: [
          {
            messageId: "missingRel",
          },
        ],
      },
      {
        code: '<a href="/" target="_blank" rel="noopener">Link</a>',
        errors: [
          {
            messageId: "missingRel",
          },
        ],
      },
      {
        code: '<a href="/" target="_blank" rel="noreferrer">Link</a>',
        errors: [
          {
            messageId: "missingRel",
          },
        ],
      },
    ],
  }
);
