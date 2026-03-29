// src/visual/sections/ServicesSection.tsx
import React from "react";

export function ServicesSection(props: any) {
  return (
    <section id="services" data-theme-scope="all">
      {props["services-heading"] && (
        <h2>{props["services-heading"].text}</h2>
      )}

      <div className="grid">
        {[1, 2, 3, 4, 5].map((i) => {
          const img = props[`service-card-${i}-image`];
          const title = props[`service-card-${i}-title`];
          const text = props[`service-card-${i}-text`];

          return (
            <div className="card" key={i}>
              {img && (
                <img src={img.src} alt={img.alt} />
              )}

              <div className="card-body">
                {title && <h3>{title.text}</h3>}
                {text && <p>{text.text}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
