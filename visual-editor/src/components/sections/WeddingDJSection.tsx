// src/components/sections/WeddingDJSection.tsx
import React from "react";

export function WeddingDJSection(props: any) {
  return (
    <section id="chattanooga-wedding-dj" data-theme-scope="all">
      {props["wedding-dj-heading"] && (
        <h2
          data-ve-edit="wedding-dj-heading"
          dangerouslySetInnerHTML={{
            __html: props["wedding-dj-heading"].html,
          }}
        />
      )}

      {props["wedding-dj-intro"] && (
        <p
          className="service-area"
          data-ve-edit="wedding-dj-intro"
          dangerouslySetInnerHTML={{
            __html: props["wedding-dj-intro"].html,
          }}
        />
      )}

      <div className="grid" style={{ marginTop: "26px" }}>
        {[1, 2, 3].map((i) => {
          const titleKey = `wedding-dj-card-${i}-title`;
          const textKey = `wedding-dj-card-${i}-text`;

          const title = props[titleKey];
          const text = props[textKey];

          return (
            <div className="card" key={i}>
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
