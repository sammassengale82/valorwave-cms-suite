// src/visual/sections/FAQSection.tsx
import React from "react";

export function FAQSection(props: any) {
  return (
    <section id="faq" data-theme-scope="all">
      {props["faq-heading"] && <h2>{props["faq-heading"].text}</h2>}

      <div className="bio-wrap">
        {[1, 2, 3].map((i) => {
          const key = `faq-${i}`;
          return (
            props[key] && (
              <p
                key={key}
                dangerouslySetInnerHTML={{ __html: props[key].html }}
              />
            )
          );
        })}
      </div>
    </section>
  );
}
