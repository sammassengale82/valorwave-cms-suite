// src/visual/sections/ServiceAreaSection.tsx
import React from "react";

export function ServiceAreaSection(props: any) {
  return (
    <section data-theme-scope="all">
      {props["service-area-heading"] && (
        <h2>{props["service-area-heading"].text}</h2>
      )}

      {props["service-area-text"] && (
        <p
          className="service-area"
          dangerouslySetInnerHTML={{
            __html: props["service-area-text"].html
          }}
        />
      )}
    </section>
  );
}
