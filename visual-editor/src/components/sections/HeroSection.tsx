import React from "react";

export default function HeroSection({
  heading,
  logo,
  kicker,
  tagline,
  subline,
  ctaLabel,
  ctaHref
}) {
  return (
    <section className="hero-section">
      {logo && <img src={logo} alt="Logo" className="hero-logo" />}
      {kicker && <p className="hero-kicker">{kicker}</p>}
      {heading && <h1 className="hero-heading">{heading}</h1>}
      {tagline && <p className="hero-tagline">{tagline}</p>}
      {subline && (
        <p className="hero-subline" dangerouslySetInnerHTML={{ __html: subline }} />
      )}
      {ctaLabel && (
        <a href={ctaHref} className="hero-cta">
          {ctaLabel}
        </a>
      )}
    </section>
  );
}
