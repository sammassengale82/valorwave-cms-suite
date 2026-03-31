// src/components/sections/ServiceAreaSection.tsx
import React from "react";

export function ServiceAreaSection(props: any) {
  return (
    <section data-theme-scope="all">
      {props["service-area-heading"] && (
        <h2
          data-ve-edit="service-area-heading"
          dangerouslySetInnerHTML={{
            __html: props["service-area-heading"].html,
          }}
        />
      )}

      {props["service-area-text"] && (
        <p
          className="service-area"
          data-ve-edit="service-area-text"
          dangerouslySetInnerHTML={{
            __html: props["service-area-text"].html,
          }}
        />
      )}
    </section>
  );
}
