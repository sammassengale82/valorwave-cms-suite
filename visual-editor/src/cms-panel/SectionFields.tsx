import React from "react";
import { useCanvasState } from "../canvas/CanvasState";
import { findNodeById } from "../canvas/VisualTree";

import HeroFields from "./fields/hero";
import NavigationFields from "./fields/navigation";
import HeaderFields from "./fields/header";
import ServicesFields from "./fields/services";
import ServiceAreaFields from "./fields/service-area";
import BioFields from "./fields/bio";
import WeddingDJFields from "./fields/wedding-dj";
import FAQFields from "./fields/faq";
import BrandMeaningFields from "./fields/brand-meaning";
import HeroDiscountFields from "./fields/hero-discount";
import CalendarFields from "./fields/calendar";
import TestimonialFormFields from "./fields/testimonial-form";
import TestimonialsFields from "./fields/testimonials";
import FooterFields from "./fields/footer";
import SEOFields from "./fields/seo";
import GoogleFields from "./fields/google";

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
