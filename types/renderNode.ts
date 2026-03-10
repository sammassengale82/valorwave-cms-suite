export type NodeType =
  | "section"
  | "container"
  | "card"
  | "text"
  | "image"
  | "button"
  | "link"
  | "input"
  | "textarea"
  | "meta";

export type Breakpoint = "desktop"; // extend later if needed

export type StyleMap = Partial<Record<string, string | number>>;

export interface NodeStyles {
  desktop?: StyleMap;
  // tablet?: StyleMap;
  // mobile?: StyleMap;
}

export interface NodeContent {
  // generic content bag; each component will pick what it needs
  text?: string;
  html?: string;
  src?: string;
  alt?: string;
  href?: string;
  label?: string;
  value?: string;
}

export interface RenderTreeNode {
  id: string;
  type: NodeType;
  templateId?: string;
  templateName?: string;
  templateCategory?: string;
  templateVersion?: number;
  styles?: NodeStyles;
  content?: NodeContent;
  children?: RenderTreeNode[];
}

export interface RenderNodeProps {
  node: RenderTreeNode;
  selectedId?: string | null;
  hoveredId?: string | null;
  onSelect?: (id: string) => void;
  onHover?: (id: string | null) => void;
}