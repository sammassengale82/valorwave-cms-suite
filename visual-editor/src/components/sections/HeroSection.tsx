// src/visual/sections/HeroSection.tsx
import React from "react";

export function HeroSection(props: any) {
  return (
    <header className="hero" data-theme-scope="all">
      <div className="hero-inner">
        {props["hero-h1"] && (
          <h1 className="hero-h1">{props["hero-h1"].text}</h1>
        )}

        {props["hero-logo"] && (
          <img
            className="hero-logo"
            src={props["hero-logo"].src}
            alt={props["hero-logo"].alt}
          />
        )}

        {props["hero-kicker"] && (
          <div className="kicker">{props["hero-kicker"].text}</div>
        )}

        {props["hero-tagline"] && (
          <div className="tagline">{props["hero-tagline"].text}</div>
        )}

        {props["hero-subline"] && (
          <div className="subline">{props["hero-subline"].text}</div>
        )}

        {props["hero-cta"] && (
          <a className="btn" href={props["hero-cta"].href}>
            {props["hero-cta"].text}
          </a>
        )}
      </div>
    </header>
  );
}
