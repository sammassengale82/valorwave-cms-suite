import React from "react";

export default function HeroDiscountSection({
  heading,
  subheading,
  text1,
  text2
}) {
  return (
    <section id="hero-discount" data-theme-scope="all">
      {heading && (
        <h2 data-ve-edit="hero-discount-heading">{heading}</h2>
      )}

      <div className="bio-wrap">
        {subheading && (
          <div
            className="bio-name"
            style={{ textAlign: "center", marginBottom: "10px" }}
            data-ve-edit="hero-discount-subheading"
          >
            {subheading}
          </div>
        )}

        {text1 && (
          <p
            style={{ textAlign: "center" }}
            data-ve-edit="hero-discount-text-1"
            dangerouslySetInnerHTML={{ __html: text1 }}
          />
        )}

        {text2 && (
          <p
            style={{
              textAlign: "center",
              color: "var(--gray)",
              fontSize: "14px",
              marginTop: "10px"
            }}
            data-ve-edit="hero-discount-text-2"
            dangerouslySetInnerHTML={{ __html: text2 }}
          />
        )}
      </div>
    </section>
  );
}
