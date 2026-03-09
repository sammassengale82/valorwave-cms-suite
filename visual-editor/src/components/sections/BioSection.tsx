import React from "react";

export default function BioSection({
  heading,
  image,
  name,
  text1,
  text2,
  text3
}) {
  return (
    <section className="bio-section">
      {heading && <h2>{heading}</h2>}
      <div className="bio-content">
        {image && <img src={image} alt={name} className="bio-image" />}
        <div className="bio-text">
          {name && <h3>{name}</h3>}
          {text1 && <p dangerouslySetInnerHTML={{ __html: text1 }} />}
          {text2 && <p dangerouslySetInnerHTML={{ __html: text2 }} />}
          {text3 && <p dangerouslySetInnerHTML={{ __html: text3 }} />}
        </div>
      </div>
    </section>
  );
}
