import React from "react";

interface CardNode {
  id: string;
  props?: {
    image?: string;
    title?: string;
    text?: string;
  };
}

interface Props {
  heading?: string;
  childrenNodes?: CardNode[];
}

export default function ServicesSection({ heading, childrenNodes = [] }: Props) {
  return (
    <section className="services-section">
      {heading && <h2>{heading}</h2>}
      <div className="services-grid">
        {childrenNodes.map((card) => (
          <div key={card.id} className="service-card">
            {card.props?.image && (
              <img src={card.props.image} alt={card.props.title} />
            )}
            {card.props?.title && <h3>{card.props.title}</h3>}
            {card.props?.text && (
              <p
                dangerouslySetInnerHTML={{ __html: card.props.text }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}