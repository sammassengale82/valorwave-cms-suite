import React from "react";

export default function BrandMeaningSection({ heading, p1, p2, p3 }) {
  return (
    <section id="brand-meaning" data-theme-scope="all">
      {heading && (
        <h2 data-ve-edit="brand-meaning-heading">{heading}</h2>
      )}

      <div className="bio-wrap">
        {p1 && (
          <p
            data-ve-edit="brand-meaning-1"
            dangerouslySetInnerHTML={{ __html: p1 }}
          />
        )}

        {p2 && (
          <p
            data-ve-edit="brand-meaning-2"
            dangerouslySetInnerHTML={{ __html: p2 }}
          />
        )}

        {p3 && (
          <p
            data-ve-edit="brand-meaning-3"
            dangerouslySetInnerHTML={{ __html: p3 }}
          />
        )}
      </div>
    </section>
  );
}
