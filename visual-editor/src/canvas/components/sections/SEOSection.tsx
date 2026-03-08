import React from "react";

interface Props {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export default function SEOSection({
  metaTitle,
  metaDescription,
  metaKeywords,
  ogTitle,
  ogDescription,
  ogImage
}: Props) {
  return (
    <section className="seo-section">
      <h2>SEO Preview</h2>
      {metaTitle && <h3>{metaTitle}</h3>}
      {metaDescription && <p>{metaDescription}</p>}
      {metaKeywords && <p>Keywords: {metaKeywords}</p>}
      {ogTitle && <p>OG Title: {ogTitle}</p>}
      {ogDescription && <p>OG Description: {ogDescription}</p>}
      {ogImage && <p>OG Image: {ogImage}</p>}
    </section>
  );
}