import { toComponentName } from "./toComponentName";
import { compileProps } from "./compileProps";

const componentNameMap: Record<string, string> = {
  "wedding-dj": "WeddingDJSection",
  faq: "FAQSection",
  seo: "SEOSection"
};

export function compileNode(node: any): any {
  const templateId = node.templateId || "";

  const component =
    componentNameMap[templateId] ||
    toComponentName(templateId);

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
