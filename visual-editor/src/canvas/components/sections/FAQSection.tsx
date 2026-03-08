import React from "react";

export default function FAQSection({ heading, faq1, faq2, faq3 }) {
  return (
    <section className="faq-section">
      {heading && <h2>{heading}</h2>}
      <div className="faq-items">
        {faq1 && <div dangerouslySetInnerHTML={{ __html: faq1 }} />}
        {faq2 && <div dangerouslySetInnerHTML={{ __html: faq2 }} />}
        {faq3 && <div dangerouslySetInnerHTML={{ __html: faq3 }} />}
      </div>
    </section>
  );
}