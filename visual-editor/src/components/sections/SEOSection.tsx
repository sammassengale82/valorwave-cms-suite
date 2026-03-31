// src/components/sections/SEOSection.tsx
import React from "react";
import { Helmet } from "react-helmet";

interface SEOSectionProps {
  ["seo-title"]?: { text: string; html: string };
  ["seo-description"]?: { text: string; html: string };
  ["seo-og-image"]?: { text: string; html: string };
  ["seo-url"]?: { text: string; html: string };
}

export default function SEOSection(props: SEOSectionProps) {
  const title = props["seo-title"]?.text;
  const description = props["seo-description"]?.text;
  const ogImage = props["seo-og-image"]?.text;
  const url = props["seo-url"]?.text;

  return (
    <>
      <section data-theme-scope="all">
        <h2>SEO Preview</h2>
        <div className="bio-wrap">
          <p data-ve-edit="seo-title">
            <strong>Title:</strong> {title}
          </p>
          <p data-ve-edit="seo-description">
            <strong>Description:</strong> {description}
          </p>
          <p data-ve-edit="seo-url">
            <strong>URL:</strong> {url}
          </p>
          <p data-ve-edit="seo-og-image">
            <strong>OG Image:</strong> {ogImage}
          </p>
        </div>
      </section>

      <Helmet>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Valor Wave Entertainment" />
        {title && <meta property="og:title" content={title} />}
        {description && (
          <meta property="og:description" content={description} />
        )}
        {url && <meta property="og:url" content={url} />}
        {ogImage && <meta property="og:image" content={ogImage} />}

        <meta name="twitter:card" content="summary_large_image" />
        {title && <meta name="twitter:title" content={title} />}
        {description && (
          <meta name="twitter:description" content={description} />
        )}
        {ogImage && <meta name="twitter:image" content={ogImage} />}
      </Helmet>
    </>
  );
}
