import React from "react";

export default function ServiceAreaSection({ heading, text }) {
  return (
    <section className="service-area-section">
      {heading && <h2>{heading}</h2>}
      {text && (
        <p dangerouslySetInnerHTML={{ __html: text }} />
      )}
    </section>
  );
}
