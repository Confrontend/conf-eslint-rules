import { ESLintUtils } from "@typescript-eslint/utils";
const createRule = ESLintUtils.RuleCreator((name) => name);
export const rule1 = createRule({
    create(context) {
        return {
            FunctionDeclaration(node) {
                if (node.id != null) {
                    if (/^[a-z]/.test(node.id.name)) {
                        context.report({
                            messageId: "uppercase",
                            node: node.id,
                        });
                    }
                }
            },
        };
    },
    name: "uppercase-first-declarations",
    meta: {
        docs: {
            description: "Function declaration names should start with an upper-case letter.",
            recommended: "warn",
        },
        messages: {
            uppercase: "Start this name with an upper-case letter.",
        },
        type: "suggestion",
        schema: [],
    },
    defaultOptions: [],
});
