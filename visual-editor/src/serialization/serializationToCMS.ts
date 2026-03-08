import { VisualTree } from "../canvas/VisualTree";
import { useTheme } from "../theme/theme-manager";

export function serializeToCMS(tree: VisualTree, cms: any) {
  const updated = { ...cms };

  // -----------------------------
  // SECTION → CMS FIELD MAPPING
  // -----------------------------
  tree.root.forEach((node) => {
    const p = node.props || {};

    switch (node.component) {
      case "HeroSection":
        updated["hero-h1"] = p.heading;
        updated["hero-logo"] = p.logo;
        updated["hero-kicker"] = p.kicker;
        updated["hero-tagline"] = p.tagline;
        updated["hero-subline"] = p.subline;
        updated["hero-cta"] = p.ctaLabel;
        updated["hero-cta__href"] = p.ctaHref;
        break;

      case "NavigationSection":
        updated["nav-services"] = p.services;
        updated["nav-availability"] = p.availability;
        updated["nav-hero-discount"] = p.heroDiscount;
        updated["nav-request-quote"] = p.requestQuote;
        updated["nav-request-quote__href"] = p.requestQuoteHref;
        updated["nav-client-portal"] = p.clientPortal;
        updated["nav-client-portal__href"] = p.clientPortalHref;
        break;

      case "HeaderSection":
        updated["header-logo"] = p.logo;
        updated["header-brand-text"] = p.brandText;
        updated["header-social-links"] = p.socialLinks;
        break;

      case "ServicesSection":
        updated["services-heading"] = p.heading;

        node.children.forEach((card, i) => {
          const c = card.props || {};
          const n = i + 1;

          updated[`service-card-${n}-image`] = c.image;
          updated[`service-card-${n}-title`] = c.title;
          updated[`service-card-${n}-text`] = c.text;
        });
        break;

      case "ServiceAreaSection":
        updated["service-area-heading"] = p.heading;
        updated["service-area-text"] = p.text;
        break;

      case "BioSection":
        updated["bio-heading"] = p.heading;
        updated["bio-image"] = p.image;
        updated["bio-name"] = p.name;
        updated["bio-text-1"] = p.text1;
        updated["bio-text-2"] = p.text2;
        updated["bio-text-3"] = p.text3;
        break;

      case "WeddingDJSection":
        updated["wedding-dj-heading"] = p.heading;
        updated["wedding-dj-intro"] = p.intro;
        updated["wedding-dj-card-1-title"] = p.c1title;
        updated["wedding-dj-card-1-text"] = p.c1text;
        updated["wedding-dj-card-2-title"] = p.c2title;
        updated["wedding-dj-card-2-text"] = p.c2text;
        updated["wedding-dj-card-3-title"] = p.c3title;
        updated["wedding-dj-card-3-text"] = p.c3text;
        break;

      case "FAQSection":
        updated["faq-heading"] = p.heading;
        updated["faq-1"] = p.faq1;
        updated["faq-2"] = p.faq2;
        updated["faq-3"] = p.faq3;
        break;

      case "BrandMeaningSection":
        updated["brand-meaning-heading"] = p.heading;
        updated["brand-meaning-1"] = p.p1;
        updated["brand-meaning-2"] = p.p2;
        updated["brand-meaning-3"] = p.p3;
        break;

      case "HeroDiscountSection":
        updated["hero-discount-heading"] = p.heading;
        updated["hero-discount-subheading"] = p.subheading;
        updated["hero-discount-text-1"] = p.text1;
        updated["hero-discount-text-2"] = p.text2;
        break;

      case "CalendarSection":
        updated["calendar-heading"] = p.heading;
        updated["calendar-intro"] = p.intro;
        updated["calendar-note"] = p.note;
        updated["calendar-button"] = p.button;
        updated["calendar-button__href"] = p.buttonHref;
        break;

      case "TestimonialFormSection":
        updated["testimonial-form-heading"] = p.heading;
        updated["testimonial-form-name"] = p.name;
        updated["testimonial-form-email"] = p.email;
        updated["testimonial-form-event-type"] = p.eventType;
        updated["testimonial-form-date"] = p.date;
        updated["testimonial-form-message"] = p.message;
        updated["testimonial-form-permission"] = p.permission;
        updated["testimonial-form-submit"] = p.submit;
        updated["testimonial-form-footer"] = p.footer;
        break;

      case "TestimonialsSection":
        updated["testimonial-heading"] = p.heading;
        updated["testimonial-1-text"] = p.t1text;
        updated["testimonial-1-author"] = p.t1author;
        updated["testimonial-2-text"] = p.t2text;
        updated["testimonial-2-author"] = p.t2author;
        updated["testimonial-3-text"] = p.t3text;
        updated["testimonial-3-author"] = p.t3author;
        break;

      case "FooterSection":
        updated["footer-logo"] = p.logo;
        updated["footer-line-1"] = p.line1;
        updated["footer-line-2"] = p.line2;
        updated["footer-line-3"] = p.line3;
        updated["footer-line-4"] = p.line4;
        updated["footer-social-links"] = p.socialLinks;
        break;

      case "SEOSection":
        updated["meta_title"] = p.metaTitle;
        updated["meta_description"] = p.metaDescription;
        updated["meta_keywords"] = p.metaKeywords;
        updated["og_title"] = p.ogTitle;
        updated["og_description"] = p.ogDescription;
        updated["og_image"] = p.ogImage;
        break;

      case "GoogleSection":
        updated["google_analytics_id"] = p.analytics;
        break;
    }
  });

  // -----------------------------
  // THEME
  // -----------------------------
  updated.theme = useTheme.getState().themeName;

  return updated;
}