import React from "react";

export default function ServicesSection({
  heading,
  cards = []
}) {
  return (
    <section id="services" data-theme-scope="all">
      {heading && (
        <h2 data-ve-edit="services-heading">{heading}</h2>
      )}

      <div className="grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card"
            data-ve-edit={`service-card-${index + 1}`}
          >
            {card.image && (
              <img
                src={card.image}
                alt={card.alt}
                data-ve-edit={`service-card-${index + 1}-image`}
              />
            )}

            <div className="card-body">
              {card.title && (
                <h3 data-ve-edit={`service-card-${index + 1}-title`}>
                  {card.title}
                </h3>
              )}

              {card.text && (
                <p
                  data-ve-edit={`service-card-${index + 1}-text`}
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
