import { toComponentName } from "./toComponentName";
import { compileProps } from "./compileProps";

export function compileNode(node: any): any {
  const templateId = node.templateId || "";

  const component =
    node.type === "section"
      ? toComponentName(templateId)
      : null;

  return {
    id: node.id,
    type: node.type, // "section" | "block"
    component,
    props: compileProps(node),
    styles: node.styles || {},
    animations: node.animations || {},
    children: (node.children || []).map(compileNode)
  };
}
