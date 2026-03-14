import { toComponentName } from "./toComponentName";
import { compileProps } from "./compileProps";

export function compileNode(node: any): any {
  const component = toComponentName(node.templateId || "");

  return {
    id: node.id,
    type: node.type === "Section" ? "section" : "block",
    component,
    props: compileProps(node),
    styles: node.styles || {},
    animations: node.animations || {},
    children: (node.children || []).map(compileNode)
  };
}
