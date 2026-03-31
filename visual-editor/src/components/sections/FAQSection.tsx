// src/components/sections/FAQSection.tsx
import React from "react";

export function FAQSection(props: any) {
  return (
    <section id="faq" data-theme-scope="all">

      {props["faq-heading"] && (
        <h2
          data-ve-edit="faq-heading"
          dangerouslySetInnerHTML={{ __html: props["faq-heading"].html }}
        />
      )}

      <div className="bio-wrap">
        {[1, 2, 3].map((i) => {
          const key = `faq-${i}`;
          return (
            props[key] && (
              <p
                key={key}
                data-ve-edit={key}
                dangerouslySetInnerHTML={{ __html: props[key].html }}
              />
            )
          );
        })}
      </div>
    </section>
  );
}
