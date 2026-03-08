import React from "react";

export default function NavigationSection({
  services,
  availability,
  heroDiscount,
  requestQuote,
  requestQuoteHref,
  clientPortal,
  clientPortalHref
}) {
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