// src/components/sections/HeroSection.tsx
import React from "react";

export function HeroSection(props: any) {
  return (
    <header className="hero" data-theme-scope="all">
      <div className="hero-inner">
        {props["hero-h1"] && (
          <h1
            className="hero-h1"
            data-ve-edit="hero-h1"
            dangerouslySetInnerHTML={{ __html: props["hero-h1"].html }}
          />
        )}

        {props["hero-logo"] && (
          <img
            className="hero-logo"
            data-ve-edit="hero-logo"
            src={props["hero-logo"].src}
            alt={props["hero-logo"].alt}
          />
        )}

        {props["hero-kicker"] && (
          <div
            className="kicker"
            data-ve-edit="hero-kicker"
            dangerouslySetInnerHTML={{ __html: props["hero-kicker"].html }}
          />
        )}

        {props["hero-tagline"] && (
          <div
            className="tagline"
            data-ve-edit="hero-tagline"
            dangerouslySetInnerHTML={{ __html: props["hero-tagline"].html }}
          />
        )}

        {props["hero-subline"] && (
          <div
            className="subline"
            data-ve-edit="hero-subline"
            dangerouslySetInnerHTML={{ __html: props["hero-subline"].html }}
          />
        )}

        {props["hero-cta"] && (
          <a
            className="btn"
            data-ve-edit="hero-cta"
            href={props["hero-cta"].href}
          >
            {props["hero-cta"].text}
          </a>
        )}
      </div>
    </header>
  );
}
