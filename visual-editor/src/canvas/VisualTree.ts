export interface VisualNode {
  id: string;
  type: "section" | "block";
  component: string;

  props?: Record<string, any>;

  styles?: {
    desktop?: Record<string, string>;
    tablet?: Record<string, string>;
    mobile?: Record<string, string>;
  };

  animations?: {
    desktop?: AnimationConfig[];
    tablet?: AnimationConfig[];
    mobile?: AnimationConfig[];
  };

  children?: VisualNode[];
}

export interface AnimationConfig {
  type: string;        // fade-in, slide-up, parallax, etc.
  duration: number;    // ms
  delay: number;       // ms
  easing: string;      // ease, ease-out, cubic-bezier(...)
  trigger: string;     // on-load, on-visible, on-scroll
  speed?: number;      // for parallax
  threshold?: number;  // for scroll triggers
  loop?: boolean;      // for looping animations
}

export interface VisualTree {
  root: VisualNode[];
}

export function findNodeById(tree: VisualTree, id: string): VisualNode | null {
  function search(nodes: VisualNode[]): VisualNode | null {
    for (const n of nodes) {
      if (n.id === id) return n;
      if (n.children) {
        const child = search(n.children);
        if (child) return child;
      }
    }
    return null;
  }

  return search(tree.root);
}