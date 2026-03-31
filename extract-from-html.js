// extract-from-html.js
//
// Run with: node extract-from-html.js
//
// PURPOSE:
// 1. Read the LIVE website HTML (valorwaveentertainment/index.html)
// 2. Extract SEO, full CSS, sections, images, and editable fields
// 3. Write CMS internal data → template.data.json
// 4. Write website runtime data → publish.json
// 5. Write FULL site CSS → visual-editor/src/styles/site.css

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

// ------------------------------------------------------------
// PATHS
// ------------------------------------------------------------

const WEBSITE_INDEX = path.resolve(
  __dirname,
  "../valorwaveentertainment/index.html"
);

const TEMPLATE_DATA_JSON = path.resolve(
  __dirname,
  "visual-editor/src/template/template.data.json"
);

const PUBLISH_JSON = path.resolve(
  __dirname,
  "../valorwaveentertainment/publish.json"
);

const SITE_CSS = path.resolve(
  __dirname,
  "visual-editor/src/styles/site.css"
);

// ------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------

function normalizeImageSrc(src) {
  if (!src) return src;
  const clean = src.split("?")[0].split("#")[0];

  if (clean.startsWith("/image/") || clean.startsWith("/images/")) {
    return `/image/${path.basename(clean)}`;
  }
  if (clean.startsWith("image/") || clean.startsWith("images/")) {
    return `/image/${path.basename(clean)}`;
  }
  if (!clean.includes("/")) {
    return `/image/${clean}`;
  }
  return clean;
}

function textOrNull(el) {
  if (!el) return null;
  const t = el.textContent.trim();
  return t || null;
}

function attrOrNull(el, name) {
  if (!el) return null;
  const v = el.getAttribute(name);
  return v || null;
}

// Extract all data-ve-edit fields inside a container
function extractEditableFields(container) {
  const map = {};
  if (!container) return map;

  const nodes = container.querySelectorAll("[data-ve-edit]");
  nodes.forEach((node) => {
    const key = node.getAttribute("data-ve-edit");
    if (!key) return;

    if (node.tagName.toLowerCase() === "img") {
      map[key] = {
        type: "image",
        src: normalizeImageSrc(node.getAttribute("src") || ""),
        alt: node.getAttribute("alt") || ""
      };
    } else if (node.tagName.toLowerCase() === "a") {
      map[key] = {
        type: "link",
        href: node.getAttribute("href") || "",
        text: textOrNull(node)
      };
    } else {
      map[key] = {
        type: "text",
        html: node.innerHTML.trim(),
        text: textOrNull(node)
      };
    }
  });

  return map;
}

// ------------------------------------------------------------
// SECTION MAPPING
// ------------------------------------------------------------

function extractSections(doc) {
  const sections = [];

  const push = (id, type, el) => {
    if (!el) return;
    sections.push({
      id,
      type,
      props: extractEditableFields(el)
    });
  };

  push("header", "HeaderSection", doc.querySelector("header.site-header"));
  push("hero", "HeroSection", doc.querySelector("header.hero"));
  push("services", "ServicesSection", doc.querySelector("section#services"));

  const serviceAreaEl = Array.from(doc.querySelectorAll("section")).find(
    (s) => s.querySelector("[data-ve-edit='service-area-heading']")
  );
  push("service-area", "ServiceAreaSection", serviceAreaEl);

  push("bio", "BioSection", doc.querySelector("section#bio"));
  push("wedding-dj", "WeddingDJSection", doc.querySelector("section#chattanooga-wedding-dj"));
  push("faq", "FAQSection", doc.querySelector("section#faq"));
  push("brand-meaning", "BrandMeaningSection", doc.querySelector("section#brand-meaning"));
  push("hero-discount", "HeroDiscountSection", doc.querySelector("section#hero-discount"));
  push("calendar", "CalendarSection", doc.querySelector("section#calendar"));
  push("submit-testimonial", "TestimonialFormSection", doc.querySelector("section#submit-testimonial"));

  const testimonialScrollEl = Array.from(doc.querySelectorAll("section")).find(
    (s) => s.querySelector(".testimonial-scroll")
  );
  push("testimonial-scroll", "TestimonialScrollSection", testimonialScrollEl);

  push("footer", "FooterSection", doc.querySelector("footer"));

  return sections;
}

// ------------------------------------------------------------
// MAIN
// ------------------------------------------------------------

(async function run() {
  console.log("Extractor: starting");

  if (!fs.existsSync(WEBSITE_INDEX)) {
    console.error("Extractor: website index.html not found:", WEBSITE_INDEX);
    process.exit(1);
  }

  const html = fs.readFileSync(WEBSITE_INDEX, "utf8");
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // ------------------------------------------------------------
  // SEO
  // ------------------------------------------------------------
  const title = textOrNull(doc.querySelector("title")) || "";
  const metaDescription =
    attrOrNull(doc.querySelector("meta[name='description']"), "content") || "";
  const metaKeywords =
    attrOrNull(doc.querySelector("meta[name='keywords']"), "content") || "";

  const ogTitle =
    attrOrNull(doc.querySelector("meta[property='og:title']"), "content") || "";
  const ogDescription =
    attrOrNull(
      doc.querySelector("meta[property='og:description']"),
      "content"
    ) || "";
  const ogImageRaw =
    attrOrNull(doc.querySelector("meta[property='og:image']"), "content") || "";
  const ogImage = normalizeImageSrc(ogImageRaw);

  const siteTheme =
    doc.documentElement.getAttribute("data-theme") ||
    doc.body.getAttribute("data-theme-scope") ||
    "default";

  // ------------------------------------------------------------
  // FULL CSS EXTRACTION
  // ------------------------------------------------------------
  const styleTag = doc.querySelector("style");
  let fullCSS = "";

  if (styleTag) {
    fullCSS = styleTag.textContent.trim();
  }

  fs.writeFileSync(SITE_CSS, fullCSS, "utf8");
  console.log("Extractor: wrote FULL site.css →", SITE_CSS);

  // ------------------------------------------------------------
  // SECTIONS
  // ------------------------------------------------------------
  const sections = extractSections(doc);

  console.log("Extractor: sections extracted:", sections.map(s => s.id));

  // ------------------------------------------------------------
  // CMS INTERNAL TEMPLATE DATA
  // ------------------------------------------------------------
  const templateData = {
    site: {
      theme: siteTheme,
      meta_title: title,
      meta_description: metaDescription,
      meta_keywords: metaKeywords,
      og_title: ogTitle,
      og_description: ogDescription,
      og_image: ogImage
    },
    sections
  };

  // ------------------------------------------------------------
  // WEBSITE RUNTIME PUBLISH JSON
  // ------------------------------------------------------------
  const publishJson = {
    theme: siteTheme,
    seo: {
      title,
      description: metaDescription,
      keywords: metaKeywords,
      ogTitle,
      ogDescription,
      ogImage
    },
    analytics: {
      googleAnalyticsId: "G-PPBLPGS51B"
    },
    sections: sections.map((s) => ({
      id: s.id,
      type: s.type,
      props: s.props
    }))
  };

  fs.writeFileSync(
    TEMPLATE_DATA_JSON,
    JSON.stringify(templateData, null, 2),
    "utf8"
  );
  console.log("Extractor: wrote template.data.json →", TEMPLATE_DATA_JSON);

  fs.writeFileSync(
    PUBLISH_JSON,
    JSON.stringify(publishJson, null, 2),
    "utf8"
  );
  console.log("Extractor: wrote publish.json →", PUBLISH_JSON);

  console.log("Extractor: complete");
})();
