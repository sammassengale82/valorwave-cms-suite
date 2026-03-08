import React from "react";

interface Props {
  heading?: string;
  subheading?: string;
  text1?: string;
  text2?: string;
}

export default function HeroDiscountSection({
  heading,
  subheading,
  text1,
  text2
}: Props) {
  return (
    <section className="hero-discount-section">
      {heading && <h2>{heading}</h2>}
      {subheading && <h3>{subheading}</h3>}
      {text1 && (
        <p dangerouslySetInnerHTML={{ __html: text1 }} />
      )}
      {text2 && (
        <p dangerouslySetInnerHTML={{ __html: text2 }} />
      )}
    </section>
  );
}