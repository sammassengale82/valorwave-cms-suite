import React from "react";

export default function TestimonialsSection({
  heading,
  t1text,
  t1author,
  t2text,
  t2author,
  t3text,
  t3author
}) {
  return (
    <section className="testimonials-section">
      {heading && <h2>{heading}</h2>}
      <div className="testimonials-grid">
        {t1text && (
          <div className="testimonial">
            <p dangerouslySetInnerHTML={{ __html: t1text }} />
            {t1author && <span>{t1author}</span>}
          </div>
        )}
        {t2text && (
          <div className="testimonial">
            <p dangerouslySetInnerHTML={{ __html: t2text }} />
            {t2author && <span>{t2author}</span>}
          </div>
        )}
        {t3text && (
          <div className="testimonial">
            <p dangerouslySetInnerHTML={{ __html: t3text }} />
            {t3author && <span>{t3author}</span>}
          </div>
        )}
      </div>
    </section>
  );
}