import { TSESTree } from "@typescript-eslint/utils";
import {
  RuleContext,
  RuleListener,
} from "@typescript-eslint/utils/dist/ts-eslint";

interface Options {
  rel: string;
  target: string;
}

export default {
  meta: {
    type: "suggestion",
    docs: {
      description:
        'Ensure all a elements have a rel="noopener noreferrer" attribute when target="_blank".',
      category: "Best Practices",
      recommended: true,
    },
    schema: [
      {
        type: "object",
        properties: {
          rel: {
            type: "string",
            default: "noopener noreferrer",
          },
          target: {
            type: "string",
            default: "_blank",
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      missingRel:
        'Anchor elements with target="_blank" must have rel="noopener noreferrer" attribute.',
    },
  },
  create(context: RuleContext<string, [Options]>) {
    const options = context.options[0] || {};
    const rel = options.rel || "noopener noreferrer";
    const target = options.target || "_blank";

    function checkLink(node: TSESTree.JSXElement): void {
      const openingElement = node.openingElement;
      if (
        openingElement.name.type === "JSXIdentifier" &&
        openingElement.name.name === "a"
      ) {
        const targetAttribute = openingElement.attributes.find(
          (attribute) =>
            attribute.type === "JSXAttribute" &&
            attribute.name.name === "target"
        ) as TSESTree.JSXAttribute | undefined;
        if (
          targetAttribute &&
          targetAttribute.value &&
          targetAttribute.value.type === "Literal" &&
          targetAttribute.value.value === target
        ) {
          const relAttribute = openingElement.attributes.find(
            (attribute) =>
              attribute.type === "JSXAttribute" && attribute.name.name === "rel"
          ) as TSESTree.JSXAttribute | undefined;
          if (
            !relAttribute ||
            !relAttribute.value ||
            relAttribute.value.type !== "Literal" ||
            relAttribute.value.value !== rel
          ) {
            context.report({
              node,
              messageId: "missingRel",
            });
          }
        }
      }
    }

    return {
      JSXElement: checkLink,
    };
  },
};