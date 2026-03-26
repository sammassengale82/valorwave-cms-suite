import React from "react";

export default function FAQSection({ faq1, faq2, faq3 }) {
  return (
    <section id="faq" data-theme-scope="all">
      <h2 data-ve-edit="faq-heading">FAQ</h2>

      <div className="bio-wrap">
        {faq1 && (
          <p
            data-ve-edit="faq-1"
            dangerouslySetInnerHTML={{ __html: faq1 }}
          />
        )}

        {faq2 && (
          <p
            data-ve-edit="faq-2"
            dangerouslySetInnerHTML={{ __html: faq2 }}
          />
        )}

        {faq3 && (
          <p
            data-ve-edit="faq-3"
            dangerouslySetInnerHTML={{ __html: faq3 }}
          />
        )}
      </div>
    </section>
  );
}
