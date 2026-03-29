// src/visual/sections/CalendarSection.tsx
import React from "react";

export function CalendarSection(props: any) {
  return (
    <section id="calendar" data-theme-scope="all">
      {props["calendar-heading"] && (
        <h2>{props["calendar-heading"].text}</h2>
      )}

      {props["calendar-intro"] && (
        <p
          className="service-area"
          style={{ textAlign: "center" }}
          dangerouslySetInnerHTML={{
            __html: props["calendar-intro"].html
          }}
        />
      )}

      <div className="bio-wrap" style={{ marginTop: "18px" }}>
        {props["calendar-note"] && (
          <p
            style={{
              textAlign: "center",
              marginBottom: "14px",
              color: "var(--gray)",
              fontSize: "14px"
            }}
            dangerouslySetInnerHTML={{
              __html: props["calendar-note"].html
            }}
          />
        )}

        {/* The iframe is static — not editable */}
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

        {props["calendar-button"] && (
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <a
              className="btn"
              href={props["calendar-button"].href}
              target="_blank"
              rel="noopener"
            >
              {props["calendar-button"].text}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
