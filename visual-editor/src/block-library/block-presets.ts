import type { VisualNode } from "../canvas/VisualTree";

export const BlockPresets: Record<string, VisualNode> = {
  ServiceCard: {
    id: "",
    type: "block",
    component: "ServiceCard",
    props: {
      image: "",
      title: "New Service",
      text: "Describe this service here."
    },
    children: [],
    styles: {
      desktop: {
        padding: "16px",
        borderRadius: "8px",
        background: "#111827",
        border: "1px solid #1f2937"
      }
    }
  }
};