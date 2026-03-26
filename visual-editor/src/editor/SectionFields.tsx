import React from "react";
import { useCanvasState } from "../canvas/CanvasState";
import { findNodeById } from "../canvas/VisualTree";

import HeroFields from "../cms-panel/fields/hero";
import NavigationFields from "../cms-panel/fields/navigation";
import HeaderFields from "../cms-panel/fields/header";
import ServicesFields from "../cms-panel/fields/services";
import ServiceAreaFields from "../cms-panel/fields/service-area";
import BioFields from "../cms-panel/fields/bio";
import WeddingDJFields from "../cms-panel/fields/wedding-dj";
import FAQFields from "../cms-panel/fields/faq";
import BrandMeaningFields from "../cms-panel/fields/brand-meaning";
import HeroDiscountFields from "../cms-panel/fields/hero-discount";
import CalendarFields from "../cms-panel/fields/calendar";
import TestimonialFormFields from "../cms-panel/fields/testimonial-form";
import TestimonialsFields from "../cms-panel/fields/testimonials";
import FooterFields from "../cms-panel/fields/footer";
import SEOFields from "../cms-panel/fields/seo";
import GoogleFields from "../cms-panel/fields/google";

export default function SectionFields() {
  const selectedId = useCanvasState((s) => s.selectedId);
  const tree = useCanvasState((s) => s.tree);

  if (!selectedId) return <p>Select a section to edit CMS content</p>;

  const node = findNodeById(tree, selectedId);
  if (!node) return <p>Node not found</p>;

  switch (node.component) {
    case "HeroSection": return <HeroFields node={node} />;
    case "NavigationSection": return <NavigationFields node={node} />;
    case "HeaderSection": return <HeaderFields node={node} />;
    case "ServicesSection": return <ServicesFields node={node} />;
    case "ServiceAreaSection": return <ServiceAreaFields node={node} />;
    case "BioSection": return <BioFields node={node} />;
    case "WeddingDJSection": return <WeddingDJFields node={node} />;
    case "FAQSection": return <FAQFields node={node} />;
    case "BrandMeaningSection": return <BrandMeaningFields node={node} />;
    case "HeroDiscountSection": return <HeroDiscountFields node={node} />;
    case "CalendarSection": return <CalendarFields node={node} />;
    case "TestimonialFormSection": return <TestimonialFormFields node={node} />;
    case "TestimonialsSection": return <TestimonialsFields node={node} />;
    case "FooterSection": return <FooterFields node={node} />;
    case "SEOSection": return <SEOFields node={node} />;
    case "GoogleSection": return <GoogleFields node={node} />;
    default:
      return <p>No CMS fields for this component</p>;
  }
}
