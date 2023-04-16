import { RuleTester } from "@typescript-eslint/utils/dist/eslint-utils";
import rule from "./component-name-pascal-case";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});

// TODO fix any cas
ruleTester.run("react-functional-component-naming-convention", rule as any, {
  valid: [
    "const MyComponent = () => <div>Hello World</div>;",
    "const MyComponent = function() { return <div>Hello World</div>; }",
  ],
  invalid: [
    {
      code: "const myComponent = () => <div>Hello World</div>;",
      errors: [
        {
          messageId: "invalidName",
        },
      ],
    },
    {
      code: "const my_component = function() { return <div>Hello World</div>; }",
      errors: [
        {
          messageId: "invalidName",
        },
      ],
    },
  ],
});
