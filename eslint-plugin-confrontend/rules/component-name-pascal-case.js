const rule = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Enforce a naming convention for React functional components',
            category: 'Stylistic Issues',
            recommended: true,
        },
        schema: [],
    },
    create(context) {
        return {
            VariableDeclarator(node) {
                const variableDeclarator = node;
                if (variableDeclarator.init &&
                    (variableDeclarator.init.type === 'ArrowFunctionExpression' ||
                        variableDeclarator.init.type === 'FunctionExpression')) {
                    if (variableDeclarator.id.type === 'Identifier' &&
                        !/^[A-Z][a-zA-Z]*$/.test(variableDeclarator.id.name)) {
                        context.report({
                            node,
                            message: 'React functional component names must be in PascalCase',
                        });
                    }
                }
            },
        };
    },
};
export default rule;
