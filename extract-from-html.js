const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const SOURCE_HTML = path.join(__dirname, "..", "valorwaveentertainment", "index.html");
const OUTPUT_JSON = path.join(
  __dirname,
  "visualeditor",
  "src",
  "templates",
  "template",
  "template.data.json"
);

function loadHtml() {
  let html = fs.readFileSync(SOURCE_HTML, "utf8");

  // Remove BOM if present
  if (html.charCodeAt(0) === 0xFEFF) {
    html = html.slice(1);
  }

  return cheerio.load(html, { decodeEntities: false });
}

function ve($, key) {
  return $(`[data-ve-edit="${key}"]`).first().text().trim();
}

function veAttr($, key, attr) {
  return $(`[data-ve-edit="${key}"]`).first().attr(attr) || "";
}

function buildTemplateData() {
  const $ = loadHtml();

  const data = {
    sections: [
      {
        id: "header",
        type: "HeaderSection",
        props: {
          logo: veAttr($, "header-logo", "src"),
          brandText: ve($, "header-brand-text"),
          services: ve($, "nav-services"),
          availability: ve($, "nav-availability"),
          heroDiscount: ve($, "nav-hero-discount"),
          requestQuote: ve($, "nav-request-quote"),
          requestQuoteHref: veAttr($, "nav-request-quote", "href"),
          clientPortal: ve($, "nav-client-portal"),
          clientPortalHref: veAttr($, "nav-client-portal", "href"),
          socialLinks: ""
        }
      },

      {
        id: "hero",
        type: "HeroSection",
        props: {
          heading: ve($, "hero-h1"),
          logo: veAttr($, "hero-logo", "src"),
          kicker: ve($, "hero-kicker"),
          tagline: ve($, "hero-tagline"),
          subline: ve($, "hero-subline"),
          ctaLabel: ve($, "hero-cta"),
          ctaHref: veAttr($, "hero-cta", "href")
        }
      },

      {
        id: "services",
        type: "ServicesSection",
        props: {
          heading: ve($, "services-heading"),
          cards: Array.from({ length: 5 }).map((_, i) => ({
            image: veAttr($, `service-card-${i+1}-image`, "src"),
            title: ve($, `service-card-${i+1}-title`),
            text: ve($, `service-card-${i+1}-text`)
          }))
        }
      },

      {
        id: "service-area",
        type: "ServiceAreaSection",
        props: {
          heading: ve($, "service-area-heading"),
          text: ve($, "service-area-text")
        }
      },

      {
        id: "bio",
        type: "BioSection",
        props: {
          heading: ve($, "bio-heading"),
          image: veAttr($, "bio-image", "src"),
          name: ve($, "bio-name"),
          text1: ve($, "bio-text-1"),
          text2: ve($, "bio-text-2"),
          text3: ve($, "bio-text-3")
        }
      },

      {
        id: "chattanooga-wedding-dj",
        type: "WeddingDJSection",
        props: {
          heading: ve($, "wedding-dj-heading"),
          intro: ve($, "wedding-dj-intro"),
          cards: Array.from({ length: 3 }).map((_, i) => ({
            title: ve($, `wedding-dj-card-${i+1}-title`),
            text: ve($, `wedding-dj-card-${i+1}-text`)
          }))
        }
      },

      {
        id: "faq",
        type: "FAQSection",
        props: {
          faq1: ve($, "faq-1"),
          faq2: ve($, "faq-2"),
          faq3: ve($, "faq-3")
        }
      },

      {
        id: "brand-meaning",
        type: "BrandMeaningSection",
        props: {
          heading: ve($, "brand-meaning-heading"),
          p1: ve($, "brand-meaning-1"),
          p2: ve($, "brand-meaning-2"),
          p3: ve($, "brand-meaning-3")
        }
      },

      {
        id: "hero-discount",
        type: "HeroDiscountSection",
        props: {
          heading: ve($, "hero-discount-heading"),
          subheading: ve($, "hero-discount-subheading"),
          text1: ve($, "hero-discount-text-1"),
          text2: ve($, "hero-discount-text-2")
        }
      },

      {
        id: "calendar",
        type: "CalendarSection",
        props: {
          heading: ve($, "calendar-heading"),
          intro: ve($, "calendar-intro"),
          note: ve($, "calendar-note"),
          button: ve($, "calendar-button"),
          buttonHref: veAttr($, "calendar-button", "href")
        }
      },

      {
        id: "submit-testimonial",
        type: "TestimonialFormSection",
        props: {
          heading: ve($, "testimonial-form-heading"),
          name: true,
          email: true,
          eventType: true,
          date: true,
          message: true,
          permission: ve($, "testimonial-form-permission"),
          submit: ve($, "testimonial-form-submit"),
          footer: ve($, "testimonial-form-footer")
        }
      },

      {
        id: "testimonials",
        type: "TestimonialsSection",
        props: {
          heading: ve($, "testimonial-heading"),
          t1text: ve($, "testimonial-1-text"),
          t1author: ve($, "testimonial-1-author"),
          t2text: ve($, "testimonial-2-text"),
          t2author: ve($, "testimonial-2-author"),
          t3text: ve($, "testimonial-3-text"),
          t3author: ve($, "testimonial-3-author")
        }
      },

      {
        id: "footer",
        type: "FooterSection",
        props: {
          logo: veAttr($, "footer-logo", "src"),
          line1: ve($, "footer-line-1"),
          line2: ve($, "footer-line-2"),
          line3: ve($, "footer-line-3"),
          line4: ve($, "footer-line-4"),
          socialLinks: ""
        }
      },

      {
        id: "seo",
        type: "SEOSection",
        props: {
          title: $("title").text().trim(),
          description: $('meta[name="description"]').attr("content") || "",
          ogImage: $('meta[property="og:image"]').attr("content") || "",
          url: $('meta[property="og:url"]').attr("content") || ""
        }
      },

      {
        id: "google",
        type: "GoogleSection",
        props: {}
      }
    ]
  };

  return data;
}

function main() {
  const data = buildTemplateData();
  fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(data, null, 2), "utf8");
  console.log("Template data written to:", OUTPUT_JSON);
}

main();
