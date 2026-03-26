import React from "react";
import { Helmet } from "react-helmet";

export default function CMSLoaderSection() {
  return (
    <>
      {/* Visible preview */}
      <section data-theme-scope="all">
        <h2>CMS Loader Script</h2>
        <div className="bio-wrap">
          <p>The CMS loader script is active:</p>
          <code>/js/cms-loader.js</code>
        </div>
      </section>

      {/* Real script injection */}
      <Helmet>
        <script src="/js/cms-loader.js"></script>
      </Helmet>
    </>
  );
}
