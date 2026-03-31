// src/components/sections/BioSection.tsx
import React from "react";

export function BioSection(props: any) {
  return (
    <section id="bio" data-theme-scope="all">

      {props["bio-heading"] && (
        <h2
          data-ve-edit="bio-heading"
          dangerouslySetInnerHTML={{ __html: props["bio-heading"].html }}
        />
      )}

      <div className="bio-wrap">
        <div className="bio-head">

          {props["bio-image"] && (
            <img
              className="bio-image"
              data-ve-edit="bio-image"
              src={props["bio-image"].src}
              alt={props["bio-image"].alt}
            />
          )}

          {props["bio-name"] && (
            <div
              className="bio-name"
              data-ve-edit="bio-name"
              dangerouslySetInnerHTML={{ __html: props["bio-name"].html }}
            />
          )}
        </div>

        {[1, 2, 3].map((i) => {
          const key = `bio-text-${i}`;
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
