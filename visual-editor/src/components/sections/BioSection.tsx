// src/visual/sections/BioSection.tsx
import React from "react";

export function BioSection(props: any) {
  return (
    <section id="bio" data-theme-scope="all">
      {props["bio-heading"] && <h2>{props["bio-heading"].text}</h2>}

      <div className="bio-wrap">
        <div className="bio-head">
          {props["bio-image"] && (
            <img
              className="bio-image"
              src={props["bio-image"].src}
              alt={props["bio-image"].alt}
            />
          )}

          {props["bio-name"] && (
            <div className="bio-name">{props["bio-name"].text}</div>
          )}
        </div>

        {[1, 2, 3].map((i) => {
          const key = `bio-text-${i}`;
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
