// src/canvas/cmsConverters.ts
import type { CmsTemplate, CmsNode, CmsStyles } from "./cmsTypes";
import type { Node, BlockType } from "./CanvasState";

function mapCmsTypeToBlockType(type: string): BlockType | undefined {
  switch (type) {
    case "text":
      return "text";
    case "image":
      return "image";
    case "button":
      return "button";
    case "grid":
      return "grid";
    case "hero":
      return "hero";
    default:
      return undefined;
  }
}

function mapBlockTypeToCmsType(blockType?: BlockType): string {
  if (!blockType) return "unknown";
  switch (blockType) {
    case "text":
      return "text";
    case "image":
      return "image";
    case "button":
      return "button";
    case "grid":
      return "grid";
    case "hero":
      return "hero";
    default:
      return "unknown";
  }
}

function cmsStylesToNode(cmsStyles?: CmsStyles) {
  if (!cmsStyles) return { style: undefined, layout: undefined, responsive: undefined };

  const desktop = cmsStyles.desktop ?? {};
  const { background, padding, margin, ...rest } = desktop;

  const style = {
    background,
    padding,
    margin,
  };

  const layout = {
    ...rest,
  };

  const responsive: Node["responsive"] = {
    tablet: cmsStyles.tablet ? { ...cmsStyles.tablet } : undefined,
    mobile: cmsStyles.mobile ? { ...cmsStyles.mobile } : undefined,
  };

  return { style, layout, responsive };
}

function nodeStylesToCms(node: Node): CmsStyles | undefined {
  const hasDesktop =
    (node.style && Object.keys(node.style).length > 0) ||
    (node.layout && Object.keys(node.layout).length > 0);

  const desktop: any = {};

  if (node.style) {
    if (node.style.background) desktop.background = node.style.background;
    if (node.style.padding) desktop.padding = node.style.padding;
    if (node.style.margin) desktop.margin = node.style.margin;
  }

  if (node.layout) {
    Object.assign(desktop, node.layout);
  }

  const tablet = node.responsive?.tablet ? { ...node.responsive.tablet } : undefined;
  const mobile = node.responsive?.mobile ? { ...node.responsive.mobile } : undefined;

  if (!hasDesktop && !tablet && !mobile) return undefined;

  const styles: CmsStyles = {};
  if (hasDesktop) styles.desktop = desktop;
  if (tablet) styles.tablet = tablet;
  if (mobile) styles.mobile = mobile;

  return styles;
}

function cmsNodeToEditorNode(cmsNode: CmsNode): Node {
  const isSection = cmsNode.type === "section";

  const { style, layout, responsive } = cmsStylesToNode(cmsNode.styles);

  const node: Node = {
    id: cmsNode.id,
    type: isSection ? "Section" : "Block",
    blockType: isSection ? undefined : mapCmsTypeToBlockType(cmsNode.type),
    content: cmsNode.content
      ? {
          text: cmsNode.content.text,
          imageUrl: cmsNode.content.src,
          buttonLabel: cmsNode.content.text,
          buttonHref: cmsNode.content.href,
        }
      : undefined,
    style,
    layout,
    responsive,
    children: cmsNode.children ? cmsNode.children.map(cmsNodeToEditorNode) : undefined,
  };

  return node;
}

function editorNodeToCmsNode(node: Node): CmsNode {
  const isSection = node.type === "Section";

  const cmsNode: CmsNode = {
    id: node.id,
    type: isSection ? "section" : mapBlockTypeToCmsType(node.blockType),
    content: {},
    styles: nodeStylesToCms(node),
    children: node.children ? node.children.map(editorNodeToCmsNode) : undefined,
  };

  if (node.content) {
    if (node.content.text) cmsNode.content!.text = node.content.text;
    if (node.content.imageUrl) cmsNode.content!.src = node.content.imageUrl;
    if (node.content.buttonLabel) cmsNode.content!.text = node.content.buttonLabel;
    if (node.content.buttonHref) cmsNode.content!.href = node.content.buttonHref;
  }

  if (Object.keys(cmsNode.content!).length === 0) {
    delete cmsNode.content;
  }

  if (!cmsNode.styles) {
    delete cmsNode.styles;
  }

  if (!cmsNode.children || cmsNode.children.length === 0) {
    delete cmsNode.children;
  }

  return cmsNode;
}

export function cmsTemplatesToTree(templates: CmsTemplate[]): Node[] {
  const tree: Node[] = [];

  for (const tpl of templates) {
    // each template.tree is already an array of CmsNode
    for (const root of tpl.tree) {
      const sectionNode = cmsNodeToEditorNode(root);
      tree.push(sectionNode);
    }
  }

  return tree;
}

export function treeToCmsTemplates(tree: Node[]): CmsTemplate[] {
  // group by top-level sections; each section becomes its own template
  const templates: CmsTemplate[] = [];

  for (const section of tree) {
    if (section.type !== "Section") continue;

    const cmsRoot = editorNodeToCmsNode(section);

    const tpl: CmsTemplate = {
      id: section.id,
      name: section.id,
      tree: [cmsRoot],
    };

    templates.push(tpl);
  }

  return templates;
}
