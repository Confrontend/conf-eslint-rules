import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

const rule = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce a naming convention for React functional components",
      category: "Stylistic Issues",
      recommended: true,
    },
    schema: [],
    messages: {
      invalidName: "React functional component names must be in PascalCase",
    },
  },
  create(context: RuleContext<"invalidName", []>) {
    return {
      VariableDeclarator(node: TSESTree.Node) {
        const variableDeclarator = node as TSESTree.VariableDeclarator;
        if (
          variableDeclarator.init &&
          (variableDeclarator.init.type === "ArrowFunctionExpression" ||
            variableDeclarator.init.type === "FunctionExpression")
        ) {
          if (
            variableDeclarator.id.type === "Identifier" &&
            !/^[A-Z][a-zA-Z]*$/.test(variableDeclarator.id.name)
          ) {
            context.report({
              node,
              messageId: "invalidName",
            });
          }
        }
      },
    };
  },
};

export default rule;
