import React from "react";
import { Helmet } from "react-helmet";

export default function SEOSection({
  title,
  description,
  ogImage,
  url
}) {
  return (
    <>
      {/* Visible preview inside CMS */}
      <section data-theme-scope="all">
        <h2>SEO Preview</h2>
        <div className="bio-wrap">
          <p><strong>Title:</strong> {title}</p>
          <p><strong>Description:</strong> {description}</p>
          <p><strong>URL:</strong> {url}</p>
          <p><strong>OG Image:</strong> {ogImage}</p>
        </div>
      </section>

      {/* Real head injection */}
      <Helmet>
        <title>{title}</title>

        <meta name="description" content={description} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Valor Wave Entertainment" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
    </>
  );
}
