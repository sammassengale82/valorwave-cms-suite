// src/components/sections/BrandMeaningSection.tsx
import React from "react";

export function BrandMeaningSection(props: any) {
  return (
    <section id="brand-meaning" data-theme-scope="all">

      {props["brand-meaning-heading"] && (
        <h2
          data-ve-edit="brand-meaning-heading"
          dangerouslySetInnerHTML={{ __html: props["brand-meaning-heading"].html }}
        />
      )}

      <div className="bio-wrap">
        {[1, 2, 3].map((i) => {
          const key = `brand-meaning-${i}`;
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
