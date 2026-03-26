import type { SectionComponentName } from "../../components/sections";

export function toComponentName(sectionId?: string | null): SectionComponentName | undefined {
  if (!sectionId) return undefined;

  switch (sectionId) {
    case "header":
      return "HeaderSection";
    case "hero":
      return "HeroSection";
    case "services":
      return "ServicesSection";
    case "service-area":
      return "ServiceAreaSection";
    case "bio":
      return "BioSection";
    case "chattanooga-wedding-dj":
      return "WeddingDJSection";
    case "faq":
      return "FAQSection";
    case "brand-meaning":
      return "BrandMeaningSection";
    case "hero-discount":
      return "HeroDiscountSection";
    case "calendar":
      return "CalendarSection";
    case "submit-testimonial":
      return "TestimonialFormSection";
    case "testimonials":
      return "TestimonialsSection";
    case "footer":
      return "FooterSection";
    case "seo":
      return "SEOSection";
    case "google":
      return "GoogleSection";
    case "cms-loader":
      return "CMSLoaderSection";
    default:
      return undefined;
  }
}
