// src/components/sections/GoogleSection.tsx
import React from "react";
import { Helmet } from "react-helmet";

export default function GoogleSection() {
  return (
    <>
      <section data-theme-scope="all">
        <h2>Google Integrations</h2>
        <div className="bio-wrap">
          <p>Google Analytics (GA4) is active.</p>
          <p>
            Tag: <strong>G-PPBLPGS51B</strong>
          </p>
        </div>
      </section>

      <Helmet>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PPBLPGS51B"
        ></script>

        <script>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PPBLPGS51B');
        `}</script>
      </Helmet>
    </>
  );
}
