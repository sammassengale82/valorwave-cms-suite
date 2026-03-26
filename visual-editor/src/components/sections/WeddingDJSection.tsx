import React from "react";

export default function WeddingDJSection({
  heading,
  intro,
  cards = []
}) {
  return (
    <section id="chattanooga-wedding-dj" data-theme-scope="all">
      {heading && (
        <h2 data-ve-edit="wedding-dj-heading">{heading}</h2>
      )}

      {intro && (
        <p
          className="service-area"
          data-ve-edit="wedding-dj-intro"
          dangerouslySetInnerHTML={{ __html: intro }}
        />
      )}

      <div className="grid" style={{ marginTop: "26px" }}>
        {cards.map((card, index) => (
          <div
            key={index}
            className="card"
            data-ve-edit={`wedding-dj-card-${index + 1}`}
          >
            <div className="card-body">
              {card.title && (
                <h3 data-ve-edit={`wedding-dj-card-${index + 1}-title`}>
                  {card.title}
                </h3>
              )}

              {card.text && (
                <p
                  data-ve-edit={`wedding-dj-card-${index + 1}-text`}
                  dangerouslySetInnerHTML={{ __html: card.text }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
