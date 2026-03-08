import { VisualTree } from "../canvas/VisualTree";
import { useTheme } from "../theme/theme-manager";

export function deserializeFromCMS(cms: any): VisualTree {
  const tree: VisualTree = { root: [] };

  // -----------------------------
  // THEME LOAD
  // -----------------------------
  if (cms.theme) {
    useTheme.getState().setTheme(cms.theme);
  }

  // -----------------------------
  // SECTION RECONSTRUCTION
  // -----------------------------
  function addSection(component: string, props: any, children: any[] = []) {
    tree.root.push({
      id: crypto.randomUUID(),
      type: "section",
      component,
      props,
      children,
      styles: { desktop: {} }
    });
  }

  // HERO
  addSection("HeroSection", {
    heading: cms["hero-h1"],
    logo: cms["hero-logo"],
    kicker: cms["hero-kicker"],
    tagline: cms["hero-tagline"],
    subline: cms["hero-subline"],
    ctaLabel: cms["hero-cta"],
    ctaHref: cms["hero-cta__href"]
  });

  // NAVIGATION
  addSection("NavigationSection", {
    services: cms["nav-services"],
    availability: cms["nav-availability"],
    heroDiscount: cms["nav-hero-discount"],
    requestQuote: cms["nav-request-quote"],
    requestQuoteHref: cms["nav-request-quote__href"],
    clientPortal: cms["nav-client-portal"],
    clientPortalHref: cms["nav-client-portal__href"]
  });

  // HEADER
  addSection("HeaderSection", {
    logo: cms["header-logo"],
    brandText: cms["header-brand-text"],
    socialLinks: cms["header-social-links"]
  });

  // SERVICES
  addSection(
    "ServicesSection",
    { heading: cms["services-heading"] },
    [1, 2, 3, 4].map((n) => ({
      id: crypto.randomUUID(),
      type: "block",
      component: "ServiceCard",
      props: {
        image: cms[`service-card-${n}-image`],
        title: cms[`service-card-${n}-title`],
        text: cms[`service-card-${n}-text`]
      },
      children: [],
      styles: { desktop: {} }
    }))
  );

  // SERVICE AREA
  addSection("ServiceAreaSection", {
    heading: cms["service-area-heading"],
    text: cms["service-area-text"]
  });

  // BIO
  addSection("BioSection", {
    heading: cms["bio-heading"],
    image: cms["bio-image"],
    name: cms["bio-name"],
    text1: cms["bio-text-1"],
    text2: cms["bio-text-2"],
    text3: cms["bio-text-3"]
  });

  // WEDDING DJ
  addSection("WeddingDJSection", {
    heading: cms["wedding-dj-heading"],
    intro: cms["wedding-dj-intro"],
    c1title: cms["wedding-dj-card-1-title"],
    c1text: cms["wedding-dj-card-1-text"],
    c2title: cms["wedding-dj-card-2-title"],
    c2text: cms["wedding-dj-card-2-text"],
    c3title: cms["wedding-dj-card-3-title"],
    c3text: cms["wedding-dj-card-3-text"]
  });

  // FAQ
  addSection("FAQSection", {
    heading: cms["faq-heading"],
    faq1: cms["faq-1"],
    faq2: cms["faq-2"],
    faq3: cms["faq-3"]
  });

  // BRAND MEANING
  addSection("BrandMeaningSection", {
    heading: cms["brand-meaning-heading"],
    p1: cms["brand-meaning-1"],
    p2: cms["brand-meaning-2"],
    p3: cms["brand-meaning-3"]
  });

  // HERO DISCOUNT
  addSection("HeroDiscountSection", {
    heading: cms["hero-discount-heading"],
    subheading: cms["hero-discount-subheading"],
    text1: cms["hero-discount-text-1"],
    text2: cms["hero-discount-text-2"]
  });

  // CALENDAR
  addSection("CalendarSection", {
    heading: cms["calendar-heading"],
    intro: cms["calendar-intro"],
    note: cms["calendar-note"],
    button: cms["calendar-button"],
    buttonHref: cms["calendar-button__href"]
  });

  // TESTIMONIAL FORM
  addSection("TestimonialFormSection", {
    heading: cms["testimonial-form-heading"],
    name: cms["testimonial-form-name"],
    email: cms["testimonial-form-email"],
    eventType: cms["testimonial-form-event-type"],
    date: cms["testimonial-form-date"],
    message: cms["testimonial-form-message"],
    permission: cms["testimonial-form-permission"],
    submit: cms["testimonial-form-submit"],
    footer: cms["testimonial-form-footer"]
  });

  // TESTIMONIALS
  addSection("TestimonialsSection", {
    heading: cms["testimonial-heading"],
    t1text: cms["testimonial-1-text"],
    t1author: cms["testimonial-1-author"],
    t2text: cms["testimonial-2-text"],
    t2author: cms["testimonial-2-author"],
    t3text: cms["testimonial-3-text"],
    t3author: cms["testimonial-3-author"]
  });

  // FOOTER
  addSection("FooterSection", {
    logo: cms["footer-logo"],
    line1: cms["footer-line-1"],
    line2: cms["footer-line-2"],
    line3: cms["footer-line-3"],
    line4: cms["footer-line-4"],
    socialLinks: cms["footer-social-links"]
  });

  // SEO
  addSection("SEOSection", {
    metaTitle: cms["meta_title"],
    metaDescription: cms["meta_description"],
    metaKeywords: cms["meta_keywords"],
    ogTitle: cms["og_title"],
    ogDescription: cms["og_description"],
    ogImage: cms["og_image"]
  });

  // GOOGLE
  addSection("GoogleSection", {
    analytics: cms["google_analytics_id"]
  });

  return tree;
}