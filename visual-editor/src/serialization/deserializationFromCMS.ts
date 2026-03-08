import type { VisualTree, VisualNode } from "../canvas/VisualTree";
import type { CMSData } from "@valorwave/shared-backend/types";

function buildHero(cms: CMSData): VisualNode {
  return {
    id: "hero",
    type: "section",
    component: "HeroSection",
    props: {
      heading: cms["hero-h1"] ?? "",
      tagline: cms["hero-tagline"] ?? "",
      subline: cms["hero-subline"] ?? "",
      ctaLabel: cms["hero-cta"] ?? "",
      ctaHref: cms["hero-cta__href"] ?? ""
    },
    styles: {
      desktop: { padding: "80px 40px" }
    },
    children: []
  };
}

function buildServices(cms: CMSData): VisualNode {
  const makeCard = (id: string, prefix: string): VisualNode => ({
    id,
    type: "block",
    component: "ServiceCard",
    props: {
      image: cms[`${prefix}-image`] ?? "",
      title: cms[`${prefix}-title`] ?? "",
      text: cms[`${prefix}-text`] ?? ""
    },
    styles: {
      desktop: {}
    }
  });

  return {
    id: "services",
    type: "section",
    component: "ServicesSection",
    props: {
      heading: cms["services-heading"] ?? ""
    },
    styles: {
      desktop: { padding: "60px 40px" }
    },
    children: [
      makeCard("service-card-1", "service-card-1"),
      makeCard("service-card-2", "service-card-2"),
      makeCard("service-card-3", "service-card-3"),
      makeCard("service-card-4", "service-card-4")
    ]
  };
}

export function deserializeFromCMS(cms: CMSData): VisualTree {
  const root: VisualNode[] = [];

  root.push(buildHero(cms));
  root.push(buildServices(cms));
  // Extend with other sections as needed

  return { root };
}
