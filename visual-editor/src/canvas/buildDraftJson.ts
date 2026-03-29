import fs from "fs";
import path from "path";

export function buildDraftJson(templateData: any) {
  const out = {
    theme: templateData.site.theme,
    seo: {
      title: templateData.site.meta_title,
      description: templateData.site.meta_description,
      keywords: templateData.site.meta_keywords,
      ogTitle: templateData.site.og_title,
      ogDescription: templateData.site.og_description,
      ogImage: templateData.site.og_image,
    },
    analytics: {
      googleAnalyticsId: null,
    },
    sections: templateData.sections.map((s: any) => ({
      id: s.id,
      component: s.component,
      props: {
        html: s.props.html,
      },
    })),
  };

  const file = path.resolve(__dirname, "../../public/draft.json");
  fs.writeFileSync(file, JSON.stringify(out, null, 2), "utf8");

  return out;
}
