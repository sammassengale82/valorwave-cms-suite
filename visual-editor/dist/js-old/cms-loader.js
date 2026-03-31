// public/js/cms-loader.js
(async function () {
  console.log("CMS Loader: starting");

  // 1. Load published content
  let content = null;
  try {
    const res = await fetch("/publish.json", { cache: "no-store" });
    content = await res.json();
    console.log("CMS Loader: loaded publish.json", content);
  } catch (err) {
    console.error("CMS Loader: failed to load publish.json", err);
    return;
  }

  // 2. Apply theme
  if (content.theme) {
    document.documentElement.setAttribute("data-theme", content.theme);
  }

  // 3. Apply SEO
  if (content.seo) {
    if (content.seo.title) document.title = content.seo.title;

    const setMeta = (name, value) => {
      if (!value) return;
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = value;
    };

    setMeta("description", content.seo.description);
    setMeta("keywords", content.seo.keywords);
    setMeta("og:title", content.seo.ogTitle);
    setMeta("og:description", content.seo.ogDescription);
    setMeta("og:image", content.seo.ogImage);
  }

  // 4. Apply analytics
  if (content.analytics?.googleAnalyticsId) {
    const gtag = document.createElement("script");
    gtag.async = true;
    gtag.src = `https://www.googletagmanager.com/gtag/js?id=${content.analytics.googleAnalyticsId}`;
    document.head.appendChild(gtag);

    const inline = document.createElement("script");
    inline.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${content.analytics.googleAnalyticsId}');
    `;
    document.head.appendChild(inline);
  }

  // 5. Render sections
  const root = document.getElementById("app");
  if (!root) {
    console.error("CMS Loader: #app not found");
    return;
  }

  content.sections.forEach((section) => {
    const el = document.createElement("section");
    el.id = section.id;
    el.setAttribute("data-component", section.component);
    el.innerHTML = section.props.html || "";
    root.appendChild(el);
  });

  console.log("CMS Loader: complete");
})();
