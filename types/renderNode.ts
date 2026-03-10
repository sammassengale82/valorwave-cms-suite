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

export type Breakpoint = "desktop";

export type StyleMap = Partial<Record<string, string | number>>;

export interface NodeStyles {
  desktop?: StyleMap;
}

export interface NodeContent {
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

export type DropPosition = "before" | "inside" | "after";

export interface DropTarget {
  nodeId: string;
  position: DropPosition;
}

export interface RenderNodeProps {
  node: RenderTreeNode;
  selectedId?: string | null;
  hoveredId?: string | null;
  dropTarget?: DropTarget | null;
  onSelect?: (id: string) => void;
  onHover?: (id: string | null) => void;
  onDropZoneEnter?: (nodeId: string, position: DropPosition) => void;
  onDropZoneLeave?: () => void;
  onDrop?: (nodeId: string, position: DropPosition, data: any) => void;
}