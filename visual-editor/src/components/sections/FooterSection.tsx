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
    <footer className="footer-section">
      {logo && <img src={logo} alt="Footer Logo" />}
      {line1 && <p dangerouslySetInnerHTML={{ __html: line1 }} />}
      {line2 && <p dangerouslySetInnerHTML={{ __html: line2 }} />}
      {line3 && <p dangerouslySetInnerHTML={{ __html: line3 }} />}
      {line4 && <p dangerouslySetInnerHTML={{ __html: line4 }} />}
      {socialLinks && (
        <div dangerouslySetInnerHTML={{ __html: socialLinks }} />
      )}
    </footer>
  );
}
