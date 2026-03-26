import React from "react";

export default function FooterSection({
  logo,
  line1,
  line2,
  line3,
  line4,
  socialLinks
}) {
  return (
    <footer data-theme-scope="all">
      {logo && (
        <img
          src={logo}
          alt="Valor Wave Entertainment Logo"
          data-ve-edit="footer-logo"
        />
      )}

      {line1 && (
        <p data-ve-edit="footer-line-1">{line1}</p>
      )}

      {line2 && (
        <p data-ve-edit="footer-line-2">{line2}</p>
      )}

      {line3 && (
        <p data-ve-edit="footer-line-3" dangerouslySetInnerHTML={{ __html: line3 }} />
      )}

      {line4 && (
        <p data-ve-edit="footer-line-4">{line4}</p>
      )}

      {socialLinks && (
        <div
          className="social-links footer-social"
          aria-label="Social links"
          style={{ justifyContent: "center", marginTop: "16px" }}
          data-ve-edit="footer-social-links"
          dangerouslySetInnerHTML={{ __html: socialLinks }}
        />
      )}
    </footer>
  );
}