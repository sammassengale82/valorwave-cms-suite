import React from "react";

interface Props {
  heading?: string;
  intro?: string;
  note?: string;
  button?: string;
  buttonHref?: string;
}

export default function CalendarSection({
  heading,
  intro,
  note,
  button,
  buttonHref
}: Props) {
  return (
    <section className="calendar-section">
      {heading && <h2>{heading}</h2>}
      {intro && (
        <p
          className="calendar-intro"
          dangerouslySetInnerHTML={{ __html: intro }}
        />
      )}
      {note && (
        <p
          className="calendar-note"
          dangerouslySetInnerHTML={{ __html: note }}
        />
      )}
      {button && (
        <a href={buttonHref} className="calendar-button">
          {button}
        </a>
      )}
    </section>
  );
}