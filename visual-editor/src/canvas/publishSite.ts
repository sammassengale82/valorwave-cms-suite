import fs from "fs";
import path from "path";
import type { CmsTemplateData } from "./cmsTypes";

export function publishSite(templateData: CmsTemplateData) {
  // Build publish.json for the live website
  const publishOut = {
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
    sections: templateData.sections.map((s) => ({
      id: s.id,
      component: s.component,
      props: {
        html: s.props.html,
      },
    })),
  };

  // Write to the LIVE website repo
  const publishFile = path.resolve(
    __dirname,
    "../../../../valorwaveentertainment/publish.json"
  );

  fs.writeFileSync(publishFile, JSON.stringify(publishOut, null, 2), "utf8");

  console.log("Site published:", publishFile);
}
