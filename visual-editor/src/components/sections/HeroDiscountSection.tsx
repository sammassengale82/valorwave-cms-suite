// src/components/sections/HeroDiscountSection.tsx
import React from "react";

export function HeroDiscountSection(props: any) {
  return (
    <section id="hero-discount" data-theme-scope="all">
      {props["hero-discount-heading"] && (
        <h2
          data-ve-edit="hero-discount-heading"
          dangerouslySetInnerHTML={{
            __html: props["hero-discount-heading"].html,
          }}
        />
      )}

      <div className="bio-wrap">
        {props["hero-discount-subheading"] && (
          <div
            className="bio-name"
            style={{ textAlign: "center", marginBottom: "10px" }}
            data-ve-edit="hero-discount-subheading"
            dangerouslySetInnerHTML={{
              __html: props["hero-discount-subheading"].html,
            }}
          />
        )}

        {props["hero-discount-text-1"] && (
          <p
            style={{ textAlign: "center" }}
            data-ve-edit="hero-discount-text-1"
            dangerouslySetInnerHTML={{
              __html: props["hero-discount-text-1"].html,
            }}
          />
        )}

        {props["hero-discount-text-2"] && (
          <p
            style={{
              textAlign: "center",
              color: "var(--gray)",
              fontSize: "14px",
              marginTop: "10px",
            }}
            data-ve-edit="hero-discount-text-2"
            dangerouslySetInnerHTML={{
              __html: props["hero-discount-text-2"].html,
            }}
          />
        )}
      </div>
    </section>
  );
}
