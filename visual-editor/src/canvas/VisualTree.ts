export interface VisualNode {
  id: string;
  type: "section" | "block";
  component: string; // e.g. "HeroSection", "ServiceCard"
  children?: VisualNode[];
  props?: Record<string, any>;
  styles?: Record<string, any>;
}

export interface VisualTree {
  root: VisualNode[];
}