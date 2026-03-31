import fs from "fs";
import path from "path";
import type { CmsTemplateData } from "./cmsTypes";

// Save the updated template.data.json (draft source of truth)
export function saveDraft(templateData: CmsTemplateData) {
  const templateFile = path.resolve(
    __dirname,
    "../template/template.data.json"
  );

  fs.writeFileSync(templateFile, JSON.stringify(templateData, null, 2), "utf8");

  // Build draft.json for staging
  const draftOut = {
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

  const draftFile = path.resolve(__dirname, "../../public/draft.json");
  fs.writeFileSync(draftFile, JSON.stringify(draftOut, null, 2), "utf8");

  console.log("Draft saved:", draftFile);
}
