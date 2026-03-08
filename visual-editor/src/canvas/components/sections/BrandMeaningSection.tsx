import React from "react";

interface Props {
  heading?: string;
  p1?: string;
  p2?: string;
  p3?: string;
}

export default function BrandMeaningSection({
  heading,
  p1,
  p2,
  p3
}: Props) {
  return (
    <section className="brand-meaning-section">
      {heading && <h2>{heading}</h2>}
      {p1 && (
        <p dangerouslySetInnerHTML={{ __html: p1 }} />
      )}
      {p2 && (
        <p dangerouslySetInnerHTML={{ __html: p2 }} />
      )}
      {p3 && (
        <p dangerouslySetInnerHTML={{ __html: p3 }} />
      )}
    </section>
  );
}