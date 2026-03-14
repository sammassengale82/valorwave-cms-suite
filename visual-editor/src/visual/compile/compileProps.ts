export function compileProps(node: any): Record<string, any> {
  const map = Object.fromEntries(
    (node.children || []).map((c: any) => [c.id, c])
  );

  const get = (id: string, field: string = "text") =>
    map[id]?.content?.[field] || "";

  return {
    // HERO
    heading: get("hero-headline"),
    logo: get("hero-logo", "src"),
    kicker: get("hero-kicker"),
    tagline: get("hero-tagline"),
    subline: get("hero-subline"),
    ctaLabel: get("hero-cta", "text"),
    ctaHref: get("hero-cta", "href"),

    // BIO
    image: get("bio-image", "src"),
    name: get("bio-name"),
    text1: get("bio-text-1"),
    text2: get("bio-text-2"),
    text3: get("bio-text-3"),

    // BRAND MEANING
    p1: get("brand-meaning-1"),
    p2: get("brand-meaning-2"),
    p3: get("brand-meaning-3"),

    // CALENDAR
    intro: get("calendar-intro"),
    note: get("calendar-note"),
    button: get("calendar-button", "text"),
    buttonHref: get("calendar-button", "href"),

    // FAQ
    faq1: get("faq-1"),
    faq2: get("faq-2"),
    faq3: get("faq-3"),

    // FOOTER
    line1: get("footer-tagline"),
    line2: get("footer-address-line-1"),
    line3: get("footer-address-line-2"),
    line4: get("footer-phone"),
    socialLinks: get("footer-social"),

    // GOOGLE
    analytics: get("google-analytics-id"),

    // HEADER
    brandText: get("header-brand-text", "text"),
    logoHeader: get("header-logo", "src"),

    // HERO DISCOUNT
    subheading: get("hero-discount-subheading"),
    text1_hd: get("hero-discount-text-1"),
    text2_hd: get("hero-discount-text-2"),

    // NAVIGATION
    services: get("nav-services", "text"),
    availability: get("nav-availability", "text"),
    heroDiscount: get("nav-hero-discount", "text"),
    requestQuote: get("nav-request-quote", "text"),
    requestQuoteHref: get("nav-request-quote", "href"),
    clientPortal: get("nav-client-portal", "text"),
    clientPortalHref: get("nav-client-portal", "href"),

    // SERVICE AREA
    text: get("service-area-text"),

    // SERVICES (cards handled in compileNode)
    heading_services: get("services-heading"),

    // TESTIMONIAL FORM
    name_tf: get("testimonial-form-name", "label"),
    email_tf: get("testimonial-form-email", "label"),
    eventType_tf: get("testimonial-form-event-type", "label"),
    date_tf: get("testimonial-form-date", "label"),
    message_tf: get("testimonial-form-message", "label"),
    permission_tf: get("testimonial-form-permission", "text"),
    submit_tf: get("testimonial-form-submit", "text"),
    footer_tf: get("testimonial-form-footer", "text"),

    // TESTIMONIALS
    t1text: get("testimonial-1-text"),
    t1author: get("testimonial-1-author"),
    t2text: get("testimonial-2-text"),
    t2author: get("testimonial-2-author"),
    t3text: get("testimonial-3-text"),
    t3author: get("testimonial-3-author"),

    // WEDDING DJ
    intro_wdj: get("wedding-dj-intro"),
    c1title: get("wedding-dj-card-1-title"),
    c1text: get("wedding-dj-card-1-text"),
    c2title: get("wedding-dj-card-2-title"),
    c2text: get("wedding-dj-card-2-text"),
    c3title: get("wedding-dj-card-3-title"),
    c3text: get("wedding-dj-card-3-text"),
  };
}
