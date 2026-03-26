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
    <header className="hero" data-theme-scope="all">
      <div className="hero-inner">
        {heading && (
          <h1 className="hero-h1" data-ve-edit="hero-h1">
            {heading}
          </h1>
        )}

        {logo && (
          <img
            className="hero-logo"
            src={logo}
            alt="Valor Wave Entertainment Logo"
            data-ve-edit="hero-logo"
          />
        )}

        {kicker && (
          <div className="kicker" data-ve-edit="hero-kicker">
            {kicker}
          </div>
        )}

        {tagline && (
          <div className="tagline" data-ve-edit="hero-tagline">
            {tagline}
          </div>
        )}

        {subline && (
          <div className="subline" data-ve-edit="hero-subline">
            {subline}
          </div>
        )}

        {ctaLabel && (
          <a className="btn" href={ctaHref} data-ve-edit="hero-cta">
            {ctaLabel}
          </a>
        )}
      </div>
    </header>
  );
}
