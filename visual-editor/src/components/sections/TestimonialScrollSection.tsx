// src/components/sections/TestimonialScrollSection.tsx
import React from "react";

export function TestimonialScrollSection(props: any) {
  const heading = props["testimonial-heading"];

  const t1text = props["testimonial-1-text"];
  const t1author = props["testimonial-1-author"];

  const t2text = props["testimonial-2-text"];
  const t2author = props["testimonial-2-author"];

  const t3text = props["testimonial-3-text"];
  const t3author = props["testimonial-3-author"];

  return (
    <section data-theme-scope="all">
      {heading && (
        <h2
          data-ve-edit="testimonial-heading"
          dangerouslySetInnerHTML={{ __html: heading.html }}
        />
      )}

      <div className="testimonial-scroll">
        <div className="card">
          <div className="card-body">
            {t1text && (
              <p
                data-ve-edit="testimonial-1-text"
                dangerouslySetInnerHTML={{ __html: t1text.html }}
              />
            )}
            {t1author && (
              <strong data-ve-edit="testimonial-1-author">
                {t1author.text}
              </strong>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            {t2text && (
              <p
                data-ve-edit="testimonial-2-text"
                dangerouslySetInnerHTML={{ __html: t2text.html }}
              />
            )}
            {t2author && (
              <strong data-ve-edit="testimonial-2-author">
                {t2author.text}
              </strong>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            {t3text && (
              <p
                data-ve-edit="testimonial-3-text"
                dangerouslySetInnerHTML={{ __html: t3text.html }}
              />
            )}
            {t3author && (
              <strong data-ve-edit="testimonial-3-author">
                {t3author.text}
              </strong>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
