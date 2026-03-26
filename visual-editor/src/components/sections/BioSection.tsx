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
    <section id="bio" data-theme-scope="all">
      {heading && (
        <h2 data-ve-edit="bio-heading">{heading}</h2>
      )}

      <div className="bio-wrap">
        <div className="bio-head">
          {image && (
            <img
              className="bio-image"
              src={image}
              alt={name}
              data-ve-edit="bio-image"
            />
          )}

          {name && (
            <div className="bio-name" data-ve-edit="bio-name">
              {name}
            </div>
          )}
        </div>

        {text1 && (
          <p
            data-ve-edit="bio-text-1"
            dangerouslySetInnerHTML={{ __html: text1 }}
          />
        )}

        {text2 && (
          <p
            data-ve-edit="bio-text-2"
            dangerouslySetInnerHTML={{ __html: text2 }}
          />
        )}

        {text3 && (
          <p
            data-ve-edit="bio-text-3"
            dangerouslySetInnerHTML={{ __html: text3 }}
          />
        )}
      </div>
    </section>
  );
}
