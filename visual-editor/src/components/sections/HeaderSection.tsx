import React from "react";

export default function HeaderSection({
  logo,
  brandText,
  services,
  availability,
  heroDiscount,
  requestQuote,
  requestQuoteHref,
  clientPortal,
  clientPortalHref,
  socialLinks
}) {
  return (
    <header className="site-header" data-theme-scope="all">
      <div className="header-inner">
        <a className="brand-mini" href="#top" aria-label="Go to top">
          {logo && (
            <img
              src={logo}
              alt="Valor Wave Entertainment"
              data-ve-edit="header-logo"
            />
          )}
          {brandText && (
            <span className="brand-text" data-ve-edit="header-brand-text">
              {brandText}
            </span>
          )}
        </a>

        <nav className="header-nav" aria-label="Primary">
          {services && (
            <a className="nav-link" href="#services" data-ve-edit="nav-services">
              {services}
            </a>
          )}

          {availability && (
            <a
              className="nav-link"
              href="#calendar"
              data-ve-edit="nav-availability"
            >
              {availability}
            </a>
          )}

          {heroDiscount && (
            <a
              className="nav-link"
              href="#hero-discount"
              data-ve-edit="nav-hero-discount"
            >
              {heroDiscount}
            </a>
          )}

          {requestQuote && (
            <a
              className="nav-link"
              href={requestQuoteHref}
              data-ve-edit="nav-request-quote"
            >
              {requestQuote}
            </a>
          )}

          {clientPortal && (
            <a
              className="nav-link"
              href={clientPortalHref}
              target="_blank"
              rel="noopener"
              data-ve-edit="nav-client-portal"
            >
              {clientPortal}
            </a>
          )}

          {socialLinks && (
            <div
              className="social-links"
              aria-label="Social links"
              data-ve-edit="header-social-links"
              dangerouslySetInnerHTML={{ __html: socialLinks }}
            />
          )}
        </nav>
      </div>
    </header>
  );
}
