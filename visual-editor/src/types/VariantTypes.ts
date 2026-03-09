export interface BlockVariant {
  id: string;
  name: string;
  category: string; // e.g. "Primary", "Outline", "Hero", "Card"
  component: string; // e.g. "button", "card", "icon"
  previewImage?: string; // preview.jpg
  styles?: any; // style overrides
  content?: any; // content overrides
  createdAt: number;
}