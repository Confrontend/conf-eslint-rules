import { Rule } from 'eslint';
import * as ESTree from 'estree';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Enforce a naming convention for React functional components',
      category: 'Stylistic Issues',
      recommended: true,
    },
    schema: [],
  },
  create(context) {
    return {
      VariableDeclarator(node: ESTree.Node) {
        const variableDeclarator = node as ESTree.VariableDeclarator;
        if (
          variableDeclarator.init &&
          (variableDeclarator.init.type === 'ArrowFunctionExpression' ||
            variableDeclarator.init.type === 'FunctionExpression')
        ) {
          if (
            variableDeclarator.id.type === 'Identifier' &&
            !/^[A-Z][a-zA-Z]*$/.test(variableDeclarator.id.name)
          ) {
            context.report({
              node,
              message:
                'React functional component names must be in PascalCase',
            });
          }
        }
      },
    };
  },
};

export default rule;