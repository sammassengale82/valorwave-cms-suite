import React from "react";

interface Props {
  heading?: string;
  text?: string;
}

export default function ServiceAreaSection({ heading, text }: Props) {
  return (
    <section className="service-area-section">
      {heading && <h2>{heading}</h2>}
      {text && (
        <p
          className="service-area-text"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
    </section>
  );
}