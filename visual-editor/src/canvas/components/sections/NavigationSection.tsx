import React from "react";

interface Props {
  services?: string;
  availability?: string;
  heroDiscount?: string;
  requestQuote?: string;
  requestQuoteHref?: string;
  clientPortal?: string;
  clientPortalHref?: string;
}

export default function NavigationSection({
  services,
  availability,
  heroDiscount,
  requestQuote,
  requestQuoteHref,
  clientPortal,
  clientPortalHref
}: Props) {
  return (
    <nav className="nav-section">
      <ul>
        {services && <li>{services}</li>}
        {availability && <li>{availability}</li>}
        {heroDiscount && <li>{heroDiscount}</li>}
        {requestQuote && (
          <li>
            <a href={requestQuoteHref}>{requestQuote}</a>
          </li>
        )}
        {clientPortal && (
          <li>
            <a href={clientPortalHref}>{clientPortal}</a>
          </li>
        )}
      </ul>
    </nav>
  );
}