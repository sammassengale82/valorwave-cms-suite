// src/canvas/templateTypes.ts
export type TemplateNode = {
  id: string;
  type: string;
  content?: Record<string, any>;
  styles?: {
    desktop?: Record<string, string>;
    tablet?: Record<string, string>;
    mobile?: Record<string, string>;
  };
  children?: TemplateNode[];
};

export type TemplateFile = {
  id: string;
  name: string;
  tree: TemplateNode[];
};
