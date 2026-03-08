import React from "react";

interface Props {
  heading?: string;
  faq1?: string;
  faq2?: string;
  faq3?: string;
}

export default function FAQSection({ heading, faq1, faq2, faq3 }: Props) {
  return (
    <section className="faq-section">
      {heading && <h2>{heading}</h2>}
      <div className="faq-items">
        {faq1 && (
          <div
            className="faq-item"
            dangerouslySetInnerHTML={{ __html: faq1 }}
          />
        )}
        {faq2 && (
          <div
            className="faq-item"
            dangerouslySetInnerHTML={{ __html: faq2 }}
          />
        )}
        {faq3 && (
          <div
            className="faq-item"
            dangerouslySetInnerHTML={{ __html: faq3 }}
          />
        )}
      </div>
    </section>
  );
}