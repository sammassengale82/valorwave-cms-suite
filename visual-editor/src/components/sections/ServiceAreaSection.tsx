import React from "react";

export default function ServiceAreaSection({ heading, text }) {
  return (
    <section data-theme-scope="all">
      {heading && (
        <h2 data-ve-edit="service-area-heading">{heading}</h2>
      )}

      {text && (
        <p
          className="service-area"
          data-ve-edit="service-area-text"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
    </section>
  );
}
