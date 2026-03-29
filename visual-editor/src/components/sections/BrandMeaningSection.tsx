// src/visual/sections/BrandMeaningSection.tsx
import React from "react";

export function BrandMeaningSection(props: any) {
  return (
    <section id="brand-meaning" data-theme-scope="all">
      {props["brand-meaning-heading"] && (
        <h2>{props["brand-meaning-heading"].text}</h2>
      )}

      <div className="bio-wrap">
        {[1, 2, 3].map((i) => {
          const key = `brand-meaning-${i}`;
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
