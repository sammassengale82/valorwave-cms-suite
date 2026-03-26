import template from "./template/template.data.json";

export const templates = [
  {
    id: template.id,
    name: template.name,
    category: "Full Template",
    preview: "/templates/template/preview.png",
    version: template.version || 1,
    data: template
  }
];
