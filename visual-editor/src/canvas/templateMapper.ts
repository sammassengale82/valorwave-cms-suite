// src/canvas/templateMapper.ts
import type { TemplateFile, TemplateNode } from "./templateTypes";
import type { Node, BlockType } from "./CanvasState";

const STYLE_KEYS = ["background", "color", "textAlign", "padding", "margin"];
const LAYOUT_KEYS = [
  "display",
  "flexDirection",
  "justifyContent",
  "alignItems",
  "gap",
  "width",
  "height",
  "position",
  "top",
  "left",
  "right",
  "bottom",
];

export function templatesToTree(templates: Record<string, TemplateFile>): Node[] {
  const tree: Node[] = [];

  for (const key in templates) {
    const tpl = templates[key];

    for (const root of tpl.tree) {
      tree.push(mapTemplateNodeToNode(root));
    }
  }

  return tree;
}

export function treeToTemplates(tree: Node[]): Record<string, TemplateFile> {
  const sections = tree.filter((n) => n.type === "Section");
  const grouped: Record<string, Node[]> = {};

  for (const section of sections) {
    const templateId =
      section.templateId || section.id.split("-")[0] || section.id;
    if (!grouped[templateId]) grouped[templateId] = [];
    grouped[templateId].push(section);
  }

  const result: Record<string, TemplateFile> = {};

  for (const templateId in grouped) {
    const sectionNodes = grouped[templateId];
    const templateNodes: TemplateNode[] = sectionNodes.map((n) =>
      mapNodeToTemplateNode(n)
    );

    result[templateId] = {
      id: templateId,
      name: toTitleCase(templateId),
      tree: templateNodes,
    };
  }

  return result;
}

function mapTemplateNodeToNode(t: TemplateNode): Node {
  const desktop = t.styles?.desktop ?? {};
  const { style, layout } = splitStyles(desktop);

  if (t.type === "section") {
    return {
      id: t.id,
      type: "Section",
      templateType: "section",
      templateId: t.templateId,
      templateName: t.templateName,
      templateCategory: t.templateCategory,
      templateVersion: t.templateVersion,
      children: t.children?.map(mapTemplateNodeToNode),
      style,
      layout,
    };
  }

  return {
    id: t.id,
    type: "Block",
    templateType: t.type,
    templateId: t.templateId,
    templateName: t.templateName,
    templateCategory: t.templateCategory,
    templateVersion: t.templateVersion,
    blockType: mapBlockType(t.type),
    content: mapTemplateContentToNodeContent(t),
    style,
    layout,
    children: t.children?.map(mapTemplateNodeToNode),
  };
}

function mapNodeToTemplateNode(n: Node): TemplateNode {
  const desktop = mergeStyles(n.style, n.layout);

  if (n.type === "Section") {
    return {
      id: n.id,
      type: "section",
      templateId: n.templateId,
      templateName: n.templateName,
      templateCategory: n.templateCategory,
      templateVersion: n.templateVersion,
      styles: Object.keys(desktop).length ? { desktop } : undefined,
      children: n.children?.map(mapNodeToTemplateNode),
    };
  }

  return {
    id: n.id,
    type: n.templateType || mapNodeBlockTypeToTemplateType(n.blockType),
    templateId: n.templateId,
    templateName: n.templateName,
    templateCategory: n.templateCategory,
    templateVersion: n.templateVersion,
    content: mapNodeContentToTemplateContent(n),
    styles: Object.keys(desktop).length ? { desktop } : undefined,
    children: n.children?.map(mapNodeToTemplateNode),
  };
}

function splitStyles(desktop: Record<string, string>) {
  const style: Record<string, string> = {};
  const layout: Record<string, string> = {};

  for (const key in desktop) {
    if (STYLE_KEYS.includes(key)) {
      style[key] = desktop[key];
    } else if (LAYOUT_KEYS.includes(key)) {
      layout[key] = desktop[key];
    }
  }

  return { style, layout };
}

function mergeStyles(
  style?: Record<string, string>,
  layout?: Record<string, string>
): Record<string, string> {
  return {
    ...(style ?? {}),
    ...(layout ?? {}),
  };
}

function mapBlockType(type: string | undefined): BlockType | undefined {
  switch (type) {
    case "hero":
      return "hero";
    case "text":
      return "text";
    case "image":
      return "image";
    case "button":
      return "button";
    case "grid":
      return "grid";
    default:
      return undefined;
  }
}

function mapNodeBlockTypeToTemplateType(
  blockType: BlockType | undefined
): string {
  switch (blockType) {
    case "hero":
      return "hero";
    case "text":
      return "text";
    case "image":
      return "image";
    case "button":
      return "button";
    case "grid":
      return "grid";
    default:
      return "text";
  }
}

function mapTemplateContentToNodeContent(t: TemplateNode): any {
  if (!t.content) return undefined;

  if (t.type === "text") {
    return { text: t.content.text ?? "" };
  }

  if (t.type === "image") {
    return {
      imageUrl: t.content.src ?? "",
      alt: t.content.alt ?? "",
    };
  }

  if (t.type === "button") {
    return {
      text: t.content.text ?? "",
      buttonLabel: t.content.text ?? "",
      buttonHref: t.content.href ?? "",
    };
  }

  return { ...t.content };
}

function mapNodeContentToTemplateContent(n: Node): any {
  if (!n.content) return undefined;

  if (n.templateType === "text" || n.blockType === "text") {
    return { text: n.content.text ?? "" };
  }

  if (n.templateType === "image" || n.blockType === "image") {
    return {
      src: n.content.imageUrl ?? "",
      alt: n.content.alt ?? "",
    };
  }

  if (n.templateType === "button" || n.blockType === "button") {
    return {
      text: n.content.buttonLabel ?? n.content.text ?? "",
      href: n.content.buttonHref ?? "",
    };
  }

  return { ...n.content };
}

function toTitleCase(id: string): string {
  return id
    .split(/[-_]/g)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}
