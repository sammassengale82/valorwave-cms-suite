import React from "react";

interface Props {
  logo?: string;
  line1?: string;
  line2?: string;
  line3?: string;
  line4?: string;
  socialLinks?: string;
}

export default function FooterSection({
  logo,
  line1,
  line2,
  line3,
  line4,
  socialLinks
}: Props) {
  return (
    <footer className="footer-section">
      {logo && <img src={logo} alt="Footer Logo" className="footer-logo" />}
      {line1 && <p dangerouslySetInnerHTML={{ __html: line1 }} />}
      {line2 && <p dangerouslySetInnerHTML={{ __html: line2 }} />}
      {line3 && <p dangerouslySetInnerHTML={{ __html: line3 }} />}
      {line4 && <p dangerouslySetInnerHTML={{ __html: line4 }} />}
      {socialLinks && (
        <div
          className="footer-social"
          dangerouslySetInnerHTML={{ __html: socialLinks }}
        />
      )}
    </footer>
  );
}