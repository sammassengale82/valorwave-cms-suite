import React from "react";

export default function CalendarSection({
  heading,
  intro,
  note,
  button,
  buttonHref
}) {
  return (
    <section className="calendar-section">
      {heading && <h2>{heading}</h2>}
      {intro && <p dangerouslySetInnerHTML={{ __html: intro }} />}
      {note && <p dangerouslySetInnerHTML={{ __html: note }} />}
      {button && (
        <a href={buttonHref} className="calendar-button">
          {button}
        </a>
      )}
    </section>
  );
}
