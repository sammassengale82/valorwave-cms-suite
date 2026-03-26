import { VisualNode } from "../canvas/VisualTree";

export const SectionPresets: Record<string, VisualNode> = {
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
      ogImage: "",
      twitterTitle: "",
      twitterDescription: "",
      twitterImage: "",
      canonical: "",
      robots: ""
    },
    styles: {},
    animations: {},
    children: []
  },

  GoogleSection: {
    id: "",
    type: "section",
    component: "GoogleSection",
    props: {
      analytics: "",
      tagManager: "",
      siteVerification: ""
    },
    styles: {},
    animations: {},
    children: []
  },

  HeaderSection: {
    id: "",
    type: "section",
    component: "HeaderSection",
    props: {
      logoHeader: "",
      brandText: "",
      services: "",
      availability: "",
      heroDiscount: "",
      requestQuote: "",
      requestQuoteHref: "",
      clientPortal: "",
      clientPortalHref: ""
    },
    styles: {},
    animations: {},
    children: []
  },

  HeroSection: {
    id: "",
    type: "section",
    component: "HeroSection",
    props: {
      logo: "",
      kicker: "",
      heading: "",
      tagline: "",
      subline: "",
      ctaLabel: "",
      ctaHref: ""
    },
    styles: {},
    animations: {},
    children: []
  },

  ServicesSection: {
    id: "",
    type: "section",
    component: "ServicesSection",
    props: {
      heading_services: ""
    },
    styles: {},
    animations: {},
    children: []
  },

  ServiceAreaSection: {
    id: "",
    type: "section",
    component: "ServiceAreaSection",
    props: {
      heading: "",
      text: ""
    },
    styles: {},
    animations: {},
    children: []
  },

  BioSection: {
    id: "",
    type: "section",
    component: "BioSection",
    props: {
      heading: "",
      image: "",
      name: "",
      text1: "",
      text2: "",
      text3: ""
    },
    styles: {},
    animations: {},
    children: []
  },

  WeddingDJSection: {
    id: "",
    type: "section",
    component: "WeddingDJSection",
    props: {
      heading: "",
      intro_wdj: "",
      c1title: "",
      c1text: "",
      c2title: "",
      c2text: "",
      c3title: "",
      c3text: ""
    },
    styles: {},
    animations: {},
    children: []
  },

  FAQSection: {
    id: "",
    type: "section",
    component: "FAQSection",
    props: {
      heading: "",
      faq1: "",
      faq2: "",
      faq3: ""
    },
    styles: {},
    animations: {},
    children: []
  },

  BrandMeaningSection: {
    id: "",
    type: "section",
    component: "BrandMeaningSection",
    props: {
      heading: "",
      p1: "",
      p2: "",
      p3: ""
    },
    styles: {},
    animations: {},
    children: []
  },

  HeroDiscountSection: {
    id: "",
    type: "section",
    component: "HeroDiscountSection",
    props: {
      heading: "",
      subheading: "",
      text1_hd: "",
      text2_hd: ""
    },
    styles: {},
    animations: {},
    children: []
  },

  CalendarSection: {
    id: "",
    type: "section",
    component: "CalendarSection",
    props: {
      heading: "",
      intro: "",
      note: "",
      button: "",
      buttonHref: ""
    },
    styles: {},
    animations: {},
    children: []
  },

  TestimonialFormSection: {
    id: "",
    type: "section",
    component: "TestimonialFormSection",
    props: {
      heading: "",
      name_tf: "",
      email_tf: "",
      eventType_tf: "",
      date_tf: "",
      message_tf: "",
      permission_tf: "",
      submit_tf: "",
      footer_tf: ""
    },
    styles: {},
    animations: {},
    children: []
  },

  TestimonialsSection: {
    id: "",
    type: "section",
    component: "TestimonialsSection",
    props: {
      heading: "",
      t1text: "",
      t1author: "",
      t2text: "",
      t2author: "",
      t3text: "",
      t3author: ""
    },
    styles: {},
    animations: {},
    children: []
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
    styles: {},
    animations: {},
    children: []
  }
};
