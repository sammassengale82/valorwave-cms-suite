// src/components/sections/CalendarSection.tsx
import React from "react";

export function CalendarSection(props: any) {
  return (
    <section id="calendar" data-theme-scope="all">

      {props["calendar-heading"] && (
        <h2
          data-ve-edit="calendar-heading"
          dangerouslySetInnerHTML={{ __html: props["calendar-heading"].html }}
        />
      )}

      {props["calendar-intro"] && (
        <p
          className="service-area"
          style={{ textAlign: "center" }}
          data-ve-edit="calendar-intro"
          dangerouslySetInnerHTML={{ __html: props["calendar-intro"].html }}
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
            data-ve-edit="calendar-note"
            dangerouslySetInnerHTML={{ __html: props["calendar-note"].html }}
          />
        )}

        {/* Static iframe */}
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
              data-ve-edit="calendar-button"
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
