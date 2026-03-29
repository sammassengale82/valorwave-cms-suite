// src/visual/sections/TestimonialScrollSection.tsx
import React from "react";

export function TestimonialScrollSection(props: any) {
  const heading = props["testimonial-heading"]?.text;

  const t1text = props["testimonial-1-text"]?.html;
  const t1author = props["testimonial-1-author"]?.text;

  const t2text = props["testimonial-2-text"]?.html;
  const t2author = props["testimonial-2-author"]?.text;

  const t3text = props["testimonial-3-text"]?.html;
  const t3author = props["testimonial-3-author"]?.text;

  return (
    <section data-theme-scope="all">
      {heading && <h2>{heading}</h2>}

      <div className="testimonial-scroll">
        {/* Card 1 */}
        <div className="card">
          <div className="card-body">
            {t1text && (
              <p dangerouslySetInnerHTML={{ __html: t1text }} />
            )}
            {t1author && <strong>{t1author}</strong>}
          </div>
        </div>

        {/* Card 2 */}
        <div className="card">
          <div className="card-body">
            {t2text && (
              <p dangerouslySetInnerHTML={{ __html: t2text }} />
            )}
            {t2author && <strong>{t2author}</strong>}
          </div>
        </div>

        {/* Card 3 */}
        <div className="card">
          <div className="card-body">
            {t3text && (
              <p dangerouslySetInnerHTML={{ __html: t3text }} />
            )}
            {t3author && <strong>{t3author}</strong>}
          </div>
        </div>
      </div>
    </section>
  );
}
