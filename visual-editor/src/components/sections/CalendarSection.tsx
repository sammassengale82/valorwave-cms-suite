import React from "react";

export default function CalendarSection({
  heading,
  intro,
  note,
  button,
  buttonHref
}) {
  const isPreview = typeof window !== "undefined" && window.parent !== window;

  return (
    <section id="calendar" data-theme-scope="all">
      {heading && (
        <h2 data-ve-edit="calendar-heading">{heading}</h2>
      )}

      {intro && (
        <p
          className="service-area"
          style={{ textAlign: "center" }}
          data-ve-edit="calendar-intro"
          dangerouslySetInnerHTML={{ __html: intro }}
        />
      )}

      <div className="bio-wrap" style={{ marginTop: "18px" }}>
        {note && (
          <p
            style={{
              textAlign: "center",
              marginBottom: "14px",
              color: "var(--gray)",
              fontSize: "14px"
            }}
            data-ve-edit="calendar-note"
            dangerouslySetInnerHTML={{ __html: note }}
          />
        )}

        {/* ⭐ PREVIEW MODE: show placeholder instead of Google Calendar */}
        {isPreview ? (
          <div
            style={{
              borderRadius: "14px",
              border: "1px solid var(--border)",
              padding: "40px",
              textAlign: "center",
              background: "white",
              color: "var(--gray)"
            }}
          >
            Calendar preview disabled
          </div>
        ) : (
          <div
            style={{
              borderRadius: "14px",
              overflow: "hidden",
              border: "1px solid var(--border)"
            }}
          >
            <iframe
              title="Valor Wave Entertainment Availability Calendar"
              src="https://calendar.google.com/calendar/embed?src=valorwaveentertainment%40gmail.com&ctz=America%2FNew_York"
              style={{
                border: 0,
                width: "100%",
                height: "640px",
                background: "white"
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "16px" }}>
          {button && (
            <a
              className="btn"
              href={buttonHref}
              target="_blank"
              rel="noopener"
              data-ve-edit="calendar-button"
            >
              {button}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
