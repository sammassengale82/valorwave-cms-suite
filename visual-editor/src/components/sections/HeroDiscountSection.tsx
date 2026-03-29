// src/visual/sections/HeroDiscountSection.tsx
import React from "react";

export function HeroDiscountSection(props: any) {
  return (
    <section id="hero-discount" data-theme-scope="all">
      {props["hero-discount-heading"] && (
        <h2>{props["hero-discount-heading"].text}</h2>
      )}

      <div className="bio-wrap">
        {props["hero-discount-subheading"] && (
          <div
            className="bio-name"
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            {props["hero-discount-subheading"].text}
          </div>
        )}

        {props["hero-discount-text-1"] && (
          <p
            style={{ textAlign: "center" }}
            dangerouslySetInnerHTML={{
              __html: props["hero-discount-text-1"].html
            }}
          />
        )}

        {props["hero-discount-text-2"] && (
          <p
            style={{
              textAlign: "center",
              color: "var(--gray)",
              fontSize: "14px",
              marginTop: "10px"
            }}
            dangerouslySetInnerHTML={{
              __html: props["hero-discount-text-2"].html
            }}
          />
        )}
      </div>
    </section>
  );
}
