import React from "react";

export default function HeroDiscountSection({
  heading,
  subheading,
  text1,
  text2
}) {
  return (
    <section className="hero-discount-section">
      {heading && <h2>{heading}</h2>}
      {subheading && <h3>{subheading}</h3>}
      {text1 && <p dangerouslySetInnerHTML={{ __html: text1 }} />}
      {text2 && <p dangerouslySetInnerHTML={{ __html: text2 }} />}
    </section>
  );
}
