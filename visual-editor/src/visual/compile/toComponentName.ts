const overrides: Record<string, string> = {
  "wedding-dj": "WeddingDJSection",
  faq: "FAQSection",
  seo: "SEOSection",
  google: "GoogleSection"
};

export function toComponentName(templateId: string): string {
  if (overrides[templateId]) return overrides[templateId];

  return (
    templateId
      .split("-")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join("") + "Section"
  );
}
