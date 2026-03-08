import React from "react";
import { useCanvasState } from "../canvas/CanvasState";
import { findNodeById } from "../canvas/VisualTree";

import HeroFields from "./fields/hero";
import ServicesFields from "./fields/services";
import BioFields from "./fields/bio";
import FAQFields from "./fields/faq";
import TestimonialsFields from "./fields/testimonials";
import FooterFields from "./fields/footer";
import SEOFields from "./fields/seo";
import GoogleFields from "./fields/google";

export default function SectionFields() {
  const selectedId = useCanvasState((s) => s.selectedId);
  const tree = useCanvasState((s) => s.tree);

  if (!selectedId) {
    return <p>Select a section or block to edit its CMS content</p>;
  }

  const node = findNodeById(tree, selectedId);
  if (!node) return <p>Node not found</p>;

  switch (node.component) {
    case "HeroSection":
      return <HeroFields node={node} />;
    case "ServicesSection":
      return <ServicesFields node={node} />;
    case "BioSection":
      return <BioFields node={node} />;
    case "FAQSection":
      return <FAQFields node={node} />;
    case "TestimonialsSection":
      return <TestimonialsFields node={node} />;
    case "FooterSection":
      return <FooterFields node={node} />;
    case "SEOSection":
      return <SEOFields node={node} />;
    case "GoogleSection":
      return <GoogleFields node={node} />;
    default:
      return <p>No CMS fields for this component</p>;
  }
}
