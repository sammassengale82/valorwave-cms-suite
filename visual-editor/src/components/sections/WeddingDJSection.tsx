// src/visual/sections/WeddingDJSection.tsx
import React from "react";

export function WeddingDJSection(props: any) {
  return (
    <section id="chattanooga-wedding-dj" data-theme-scope="all">
      {props["wedding-dj-heading"] && (
        <h2>{props["wedding-dj-heading"].text}</h2>
      )}

      {props["wedding-dj-intro"] && (
        <p
          className="service-area"
          dangerouslySetInnerHTML={{
            __html: props["wedding-dj-intro"].html
          }}
        />
      )}

      <div className="grid" style={{ marginTop: "26px" }}>
        {[1, 2, 3].map((i) => {
          const title = props[`wedding-dj-card-${i}-title`];
          const text = props[`wedding-dj-card-${i}-text`];

          return (
            <div className="card" key={i}>
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
