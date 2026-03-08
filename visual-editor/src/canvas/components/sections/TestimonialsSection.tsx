import React from "react";

interface Props {
  heading?: string;
  t1text?: string;
  t1author?: string;
  t2text?: string;
  t2author?: string;
  t3text?: string;
  t3author?: string;
}

export default function TestimonialsSection({
  heading,
  t1text,
  t1author,
  t2text,
  t2author,
  t3text,
  t3author
}: Props) {
  return (
    <section className="testimonials-section">
      {heading && <h2>{heading}</h2>}
      <div className="testimonials-grid">
        {t1text && (
          <div className="testimonial">
            <p dangerouslySetInnerHTML={{ __html: t1text }} />
            {t1author && <span className="testimonial-author">{t1author}</span>}
          </div>
        )}
        {t2text && (
          <div className="testimonial">
            <p dangerouslySetInnerHTML={{ __html: t2text }} />
            {t2author && <span className="testimonial-author">{t2author}</span>}
          </div>
        )}
        {t3text && (
          <div className="testimonial">
            <p dangerouslySetInnerHTML={{ __html: t3text }} />
            {t3author && <span className="testimonial-author">{t3author}</span>}
          </div>
        )}
      </div>
    </section>
  );
}