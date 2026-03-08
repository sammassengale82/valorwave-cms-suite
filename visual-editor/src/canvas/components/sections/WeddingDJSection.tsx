import React from "react";

export default function WeddingDJSection({
  heading,
  intro,
  c1title,
  c1text,
  c2title,
  c2text,
  c3title,
  c3text
}) {
  return (
    <section className="wedding-dj-section">
      {heading && <h2>{heading}</h2>}
      {intro && (
        <p dangerouslySetInnerHTML={{ __html: intro }} />
      )}
      <div className="wedding-dj-cards">
        <div className="wedding-dj-card">
          {c1title && <h3>{c1title}</h3>}
          {c1text && <p dangerouslySetInnerHTML={{ __html: c1text }} />}
        </div>
        <div className="wedding-dj-card">
          {c2title && <h3>{c2title}</h3>}
          {c2text && <p dangerouslySetInnerHTML={{ __html: c2text }} />}
        </div>
        <div className="wedding-dj-card">
          {c3title && <h3>{c3title}</h3>}
          {c3text && <p dangerouslySetInnerHTML={{ __html: c3text }} />}
        </div>
      </div>
    </section>
  );
}