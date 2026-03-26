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
    <section data-theme-scope="all">
      {heading && (
        <h2 data-ve-edit="testimonial-heading">{heading}</h2>
      )}

      <div className="testimonial-scroll">
        <div className="card" data-ve-edit="testimonial-1">
          <div className="card-body">
            {t1text && (
              <p
                data-ve-edit="testimonial-1-text"
                dangerouslySetInnerHTML={{ __html: t1text }}
              />
            )}
            {t1author && (
              <strong data-ve-edit="testimonial-1-author">
                {t1author}
              </strong>
            )}
          </div>
        </div>

        <div className="card" data-ve-edit="testimonial-2">
          <div className="card-body">
            {t2text && (
              <p
                data-ve-edit="testimonial-2-text"
                dangerouslySetInnerHTML={{ __html: t2text }}
              />
            )}
            {t2author && (
              <strong data-ve-edit="testimonial-2-author">
                {t2author}
              </strong>
            )}
          </div>
        </div>

        <div className="card" data-ve-edit="testimonial-3">
          <div className="card-body">
            {t3text && (
              <p
                data-ve-edit="testimonial-3-text"
                dangerouslySetInnerHTML={{ __html: t3text }}
              />
            )}
            {t3author && (
              <strong data-ve-edit="testimonial-3-author">
                {t3author}
              </strong>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
