import React from "react";

export default function HeaderSection({ logo, brandText, socialLinks }) {
  return (
    <header className="header-section">
      <div className="header-left">
        {logo && <img src={logo} alt={brandText || "Logo"} />}
        {brandText && <span className="header-brand">{brandText}</span>}
      </div>
      {socialLinks && (
        <div
          className="header-social"
          dangerouslySetInnerHTML={{ __html: socialLinks }}
        />
      )}
    </header>
  );
}