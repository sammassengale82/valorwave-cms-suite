// src/visual/sections/FooterSection.tsx
import React from "react";

export function FooterSection(props: any) {
  return (
    <footer data-theme-scope="all">
      {props["footer-logo"] && (
        <img
          src={props["footer-logo"].src}
          alt={props["footer-logo"].alt}
        />
      )}

      {props["footer-line-1"] && (
        <p>{props["footer-line-1"].text}</p>
      )}

      {props["footer-line-2"] && (
        <p>{props["footer-line-2"].text}</p>
      )}

      {props["footer-line-3"] && (
        <p
          dangerouslySetInnerHTML={{
            __html: props["footer-line-3"].html
          }}
        />
      )}

      {props["footer-line-4"] && (
        <p>{props["footer-line-4"].text}</p>
      )}

      <div
        className="social-links footer-social"
        aria-label="Social links"
        style={{ justifyContent: "center", marginTop: "16px" }}
      >
        <a
          href="https://www.facebook.com/valorwaveentertainment"
          target="_blank"
          rel="noopener"
          aria-label="Facebook"
        >
          <svg viewBox="0 0 24 24">
            <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.4V12h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.4.7-1.4 1.4V12h2.5l-.4 2.9h-2.1v7A10 10 0 0 0 22 12z"/>
          </svg>
        </a>

        <a
          href="https://www.instagram.com/valorwaveentertainment/"
          target="_blank"
          rel="noopener"
          aria-label="Instagram"
        >
          <svg viewBox="0 0 24 24">
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z"/>
          </svg>
        </a>

        <a
          href="https://x.com/ValorwaveEnt"
          target="_blank"
          rel="noopener"
          aria-label="X"
        >
          <svg viewBox="0 0 24 24">
            <path d="M18.9 2H22l-7.3 8.3L23 22h-6.7l-5.2-6.7L4.9 22H2l7.8-9L1 2h6.8l4.7 6L18.9 2z"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}
