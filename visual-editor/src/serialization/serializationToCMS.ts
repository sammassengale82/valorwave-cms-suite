import type { VisualTree, VisualNode } from "../canvas/VisualTree";
import type { CMSData } from "@valorwave/shared-backend/types";

function applyHero(node: VisualNode, cms: CMSData) {
  cms["hero-h1"] = node.props?.heading ?? "";
  cms["hero-tagline"] = node.props?.tagline ?? "";
  cms["hero-subline"] = node.props?.subline ?? "";
  cms["hero-cta"] = node.props?.ctaLabel ?? "";
  cms["hero-cta__href"] = node.props?.ctaHref ?? "";
}

function applyServices(node: VisualNode, cms: CMSData) {
  cms["services-heading"] = node.props?.heading ?? "";

  const cards = node.children || [];
  const mapCard = (idx: number, prefix: string) => {
    const card = cards[idx];
    if (!card) return;
    cms[`${prefix}-image`] = card.props?.image ?? "";
    cms[`${prefix}-title`] = card.props?.title ?? "";
    cms[`${prefix}-text`] = card.props?.text ?? "";
  };

  mapCard(0, "service-card-1");
  mapCard(1, "service-card-2");
  mapCard(2, "service-card-3");
  mapCard(3, "service-card-4");
}

export function serializeToCMS(tree: VisualTree, base: CMSData): CMSData {
  const cms: CMSData = { ...base };

  for (const node of tree.root) {
    if (node.component === "HeroSection") {
      applyHero(node, cms);
    }
    if (node.component === "ServicesSection") {
      applyServices(node, cms);
    }
    // extend for all other sections
  }

  return cms;
}