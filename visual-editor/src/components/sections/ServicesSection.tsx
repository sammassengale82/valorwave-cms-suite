// src/components/sections/ServicesSection.tsx
import React from "react";

export function ServicesSection(props: any) {
  return (
    <section id="services" data-theme-scope="all">
      {props["services-heading"] && (
        <h2
          data-ve-edit="services-heading"
          dangerouslySetInnerHTML={{
            __html: props["services-heading"].html,
          }}
        />
      )}

      <div className="grid">
        {[1, 2, 3, 4, 5].map((i) => {
          const imgKey = `service-card-${i}-image`;
          const titleKey = `service-card-${i}-title`;
          const textKey = `service-card-${i}-text`;

          const img = props[imgKey];
          const title = props[titleKey];
          const text = props[textKey];

          return (
            <div className="card" key={i}>
              {img && (
                <img
                  data-ve-edit={imgKey}
                  src={img.src}
                  alt={img.alt}
                />
              )}

              <div className="card-body">
                {title && (
                  <h3
                    data-ve-edit={titleKey}
                    dangerouslySetInnerHTML={{ __html: title.html }}
                  />
                )}
                {text && (
                  <p
                    data-ve-edit={textKey}
                    dangerouslySetInnerHTML={{ __html: text.html }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
