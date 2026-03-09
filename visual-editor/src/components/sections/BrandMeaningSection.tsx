import React from "react";

export default function BrandMeaningSection({ heading, p1, p2, p3 }) {
  return (
    <section className="brand-meaning-section">
      {heading && <h2>{heading}</h2>}
      {p1 && <p dangerouslySetInnerHTML={{ __html: p1 }} />}
      {p2 && <p dangerouslySetInnerHTML={{ __html: p2 }} />}
      {p3 && <p dangerouslySetInnerHTML={{ __html: p3 }} />}
    </section>
  );
}
