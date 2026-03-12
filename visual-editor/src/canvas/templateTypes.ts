// src/canvas/templateTypes.ts
export type TemplateNode = {
  id: string;
  type: string; // "section", "text", "image", "button", etc.
  templateId?: string;
  templateName?: string;
  templateCategory?: string;
  templateVersion?: number;
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
  version?: number;
  tree: TemplateNode[];
};
