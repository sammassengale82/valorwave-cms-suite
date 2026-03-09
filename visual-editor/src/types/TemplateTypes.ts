export interface TemplateData {
  id: string;
  name: string;
  category: string;
  previewImage?: string;
  node: any; // full VisualNode tree
  createdAt: number;
}