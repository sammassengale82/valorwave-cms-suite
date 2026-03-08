import { VisualNode } from "../canvas/VisualTree";

export const SectionPresets: Record<string, VisualNode> = {
  HeroSection: {
    id: "",
    type: "section",
    component: "HeroSection",
    props: {
      heading: "New Hero Heading",
      tagline: "Your tagline here",
      subline: "",
      kicker: "",
      logo: "",
      ctaLabel: "Learn More",
      ctaHref: "#"
    },
    children: [],
    styles: { desktop: { padding: "80px 40px" } }
  },

  NavigationSection: {
    id: "",
    type: "section",
    component: "NavigationSection",
    props: {
      services: "Services",
      availability: "Availability",
      heroDiscount: "Hero Discount",
      requestQuote: "Request Quote",
      requestQuoteHref: "#",
      clientPortal: "Client Portal",
      clientPortalHref: "#"
    },
    children: [],
    styles: { desktop: {} }
  },

  HeaderSection: {
    id: "",
    type: "section",
    component: "HeaderSection",
    props: {
      logo: "",
      brandText: "Brand Name",
      socialLinks: ""
    },
    children: [],
    styles: { desktop: {} }
  },

  ServicesSection: {
    id: "",
    type: "section",
    component: "ServicesSection",
    props: {
      heading: "Our Services"
    },
    children: [
      {
        id: "",
        type: "block",
        component: "ServiceCard",
        props: { image: "", title: "Service 1", text: "" },
        styles: { desktop: {} }
      },
      {
        id: "",
        type: "block",
        component: "ServiceCard",
        props: { image: "", title: "Service 2", text: "" },
        styles: { desktop: {} }
      }
    ],
    styles: { desktop: {} }
  },

  ServiceAreaSection: {
    id: "",
    type: "section",
    component: "ServiceAreaSection",
    props: {
      heading: "Service Area",
      text: ""
    },
    children: [],
    styles: { desktop: {} }
  },

  BioSection: {
    id: "",
    type: "section",
    component: "BioSection",
    props: {
      heading: "Meet the DJ",
      image: "",
      name: "",
      text1: "",
      text2: "",
      text3: ""
    },
    children: [],
    styles: { desktop: {} }
  },

  WeddingDJSection: {
    id: "",
    type: "section",
    component: "WeddingDJSection",
    props: {
      heading: "Wedding DJ",
      intro: "",
      c1title: "",
      c1text: "",
      c2title: "",
      c2text: "",
      c3title: "",
      c3text: ""
    },
    children: [],
    styles: { desktop: {} }
  },

  FAQSection: {
    id: "",
    type: "section",
    component: "FAQSection",
    props: {
      heading: "FAQ",
      faq1: "",
      faq2: "",
      faq3: ""
    },
    children: [],
    styles: { desktop: {} }
  },

  BrandMeaningSection: {
    id: "",
    type: "section",
    component: "BrandMeaningSection",
    props: {
      heading: "Brand Meaning",
      p1: "",
      p2: "",
      p3: ""
    },
    children: [],
    styles: { desktop: {} }
  },

  HeroDiscountSection: {
    id: "",
    type: "section",
    component: "HeroDiscountSection",
    props: {
      heading: "Hero Discount",
      subheading: "",
      text1: "",
      text2: ""
    },
    children: [],
    styles: { desktop: {} }
  },

  CalendarSection: {
    id: "",
    type: "section",
    component: "CalendarSection",
    props: {
      heading: "Availability Calendar",
      intro: "",
      note: "",
      button: "Open Calendar",
      buttonHref: "#"
    },
    children: [],
    styles: { desktop: {} }
  },

  TestimonialFormSection: {
    id: "",
    type: "section",
    component: "TestimonialFormSection",
    props: {
      heading: "Submit a Testimonial",
      name: "",
      email: "",
      eventType: "",
      date: "",
      message: "",
      permission: "",
      submit: "Send",
      footer: ""
    },
    children: [],
    styles: { desktop: {} }
  },

  TestimonialsSection: {
    id: "",
    type: "section",
    component: "TestimonialsSection",
    props: {
      heading: "Testimonials",
      t1text: "",
      t1author: "",
      t2text: "",
      t2author: "",
      t3text: "",
      t3author: ""
    },
    children: [],
    styles: { desktop: {} }
  },

  FooterSection: {
    id: "",
    type: "section",
    component: "FooterSection",
    props: {
      logo: "",
      line1: "",
      line2: "",
      line3: "",
      line4: "",
      socialLinks: ""
    },
    children: [],
    styles: { desktop: {} }
  },

  SEOSection: {
    id: "",
    type: "section",
    component: "SEOSection",
    props: {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      ogTitle: "",
      ogDescription: "",
      ogImage: ""
    },
    children: [],
    styles: { desktop: {} }
  },

  GoogleSection: {
    id: "",
    type: "section",
    component: "GoogleSection",
    props: {
      analytics: ""
    },
    children: [],
    styles: { desktop: {} }
  }
};