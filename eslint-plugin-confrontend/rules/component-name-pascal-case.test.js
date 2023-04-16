import { RuleTester } from "eslint";
import rule from "./component-name-pascal-case";
const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
});
ruleTester.run("react-functional-component-naming-convention", rule, {
    valid: [
        `const MyComponent = () => <div>Hello World</div>;`,
        `const MyOtherComponent = function() { return <div>Hello World</div>; };`,
    ],
    invalid: [
        {
            code: `const myComponent = () => <div>Hello World</div>;`,
            errors: [
                {
                    message: "React functional component names must be in PascalCase",
                },
            ],
        },
        {
            code: `const my_other_component = function() { return <div>Hello World</div>; };`,
            errors: [
                {
                    message: "React functional component names must be in PascalCase",
                },
            ],
        },
    ],
});
