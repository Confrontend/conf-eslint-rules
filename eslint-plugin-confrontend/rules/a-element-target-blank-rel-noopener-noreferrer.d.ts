import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
interface Options {
    rel: string;
    target: string;
}
declare const _default: {
    meta: {
        type: string;
        docs: {
            description: string;
            category: string;
            recommended: boolean;
        };
        schema: {
            type: string;
            properties: {
                rel: {
                    type: string;
                    default: string;
                };
                target: {
                    type: string;
                    default: string;
                };
            };
            additionalProperties: boolean;
        }[];
        messages: {
            missingRel: string;
        };
    };
    create(context: RuleContext<string, [Options]>): {
        JSXElement: (node: TSESTree.JSXElement) => void;
    };
};
export default _default;
