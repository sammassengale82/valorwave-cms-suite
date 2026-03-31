// src/components/sections/HeaderSection.tsx
import React from "react";

export function HeaderSection(props: any) {
  return (
    <header className="site-header" data-theme-scope="all">
      <div className="header-inner">
        <a className="brand-mini" href="#top" aria-label="Go to top">
          {props["header-logo"] && (
            <img
              data-ve-edit="header-logo"
              src={props["header-logo"].src}
              alt={props["header-logo"].alt}
            />
          )}

          {props["header-brand-text"] && (
            <span
              className="brand-text"
              data-ve-edit="header-brand-text"
              dangerouslySetInnerHTML={{
                __html: props["header-brand-text"].html,
              }}
            />
          )}
        </a>

        <nav className="header-nav" aria-label="Primary">
          {props["nav-services"] && (
            <a
              className="nav-link"
              data-ve-edit="nav-services"
              href={props["nav-services"].href}
            >
              {props["nav-services"].text}
            </a>
          )}

          {props["nav-availability"] && (
            <a
              className="nav-link"
              data-ve-edit="nav-availability"
              href={props["nav-availability"].href}
            >
              {props["nav-availability"].text}
            </a>
          )}

          {props["nav-hero-discount"] && (
            <a
              className="nav-link"
              data-ve-edit="nav-hero-discount"
              href={props["nav-hero-discount"].href}
            >
              {props["nav-hero-discount"].text}
            </a>
          )}

          {props["nav-request-quote"] && (
            <a
              className="nav-link"
              data-ve-edit="nav-request-quote"
              href={props["nav-request-quote"].href}
            >
              {props["nav-request-quote"].text}
            </a>
          )}

          {props["nav-client-portal"] && (
            <a
              className="nav-link"
              data-ve-edit="nav-client-portal"
              href={props["nav-client-portal"].href}
              target="_blank"
              rel="noopener"
            >
              {props["nav-client-portal"].text}
            </a>
          )}

          <div className="social-links">
            {props["header-social-links"] && (
              <div
                data-ve-edit="header-social-links"
                dangerouslySetInnerHTML={{
                  __html: props["header-social-links"].html,
                }}
              />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
