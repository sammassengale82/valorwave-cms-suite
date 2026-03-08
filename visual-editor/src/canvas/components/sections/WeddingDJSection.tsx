import React from "react";

interface Props {
  heading?: string;
  intro?: string;
  c1title?: string;
  c1text?: string;
  c2title?: string;
  c2text?: string;
  c3title?: string;
  c3text?: string;
}

export default function WeddingDJSection({
  heading,
  intro,
  c1title,
  c1text,
  c2title,
  c2text,
  c3title,
  c3text
}: Props) {
  return (
    <section className="wedding-dj-section">
      {heading && <h2>{heading}</h2>}
      {intro && (
        <p
          className="wedding-dj-intro"
          dangerouslySetInnerHTML={{ __html: intro }}
        />
      )}
      <div className="wedding-dj-cards">
        <div className="wedding-dj-card">
          {c1title && <h3>{c1title}</h3>}
          {c1text && (
            <p dangerouslySetInnerHTML={{ __html: c1text }} />
          )}
        </div>
        <div className="wedding-dj-card">
          {c2title && <h3>{c2title}</h3>}
          {c2text && (
            <p dangerouslySetInnerHTML={{ __html: c2text }} />
          )}
        </div>
        <div className="wedding-dj-card">
          {c3title && <h3>{c3title}</h3>}
          {c3text && (
            <p dangerouslySetInnerHTML={{ __html: c3text }} />
          )}
        </div>
      </div>
    </section>
  );
}