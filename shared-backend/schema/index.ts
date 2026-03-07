// This will later define how visual sections/blocks map to CMSData keys.
// For now it's a placeholder so the visual editor can import it.

export interface SectionSchema {
  id: string;
  label: string;
  fields: string[];
}

export const SECTIONS: SectionSchema[] = [
  {
    id: "hero",
    label: "Hero",
    fields: ["hero-h1", "hero-kicker", "hero-tagline", "hero-subline", "hero-cta", "hero-cta__href"]
  },
  {
    id: "services",
    label: "Services",
    fields: [
      "services-heading",
      "service-card-1-image",
      "service-card-1-title",
      "service-card-1-text",
      "service-card-2-image",
      "service-card-2-title",
      "service-card-2-text",
      "service-card-3-image",
      "service-card-3-title",
      "service-card-3-text",
      "service-card-4-image",
      "service-card-4-title",
      "service-card-4-text"
    ]
  }
  // ...extend for all sections
];
