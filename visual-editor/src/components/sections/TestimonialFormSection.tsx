import React from "react";

export default function TestimonialFormSection({
  heading,
  name,
  email,
  eventType,
  date,
  message,
  permission,
  submit,
  footer
}) {
  return (
    <section id="submit-testimonial" data-theme-scope="all">
      {heading && (
        <h2 data-ve-edit="testimonial-form-heading">{heading}</h2>
      )}

      <form
        action="https://formsubmit.co/valorwaveentertainment@gmail.com"
        method="POST"
        className="testimonial-form"
      >
        <input
          type="hidden"
          name="_subject"
          value="New Testimonial Submission - Valor Wave Entertainment"
        />
        <input type="hidden" name="_template" value="table" />
        <input
          type="hidden"
          name="_next"
          value="https://valorwaveentertainment.com/testimonial-thank-you.html"
        />

        {name && (
          <input
            type="text"
            name="client_name"
            placeholder="Your Name"
            required
            data-ve-edit="testimonial-form-name"
          />
        )}

        {email && (
          <input
            type="email"
            name="client_email"
            placeholder="Your Email (optional)"
            data-ve-edit="testimonial-form-email"
          />
        )}

        {eventType && (
          <input
            type="text"
            name="event_type"
            placeholder="Event Type (Wedding, Birthday, Corporate, etc.)"
            required
            data-ve-edit="testimonial-form-event-type"
          />
        )}

        {date && (
          <input
            type="date"
            name="event_date"
            placeholder="Event Date"
            data-ve-edit="testimonial-form-date"
          />
        )}

        {message && (
          <textarea
            name="testimonial"
            placeholder="Write your testimonial here..."
            required
            data-ve-edit="testimonial-form-message"
          />
        )}

        {permission && (
          <label
            style={{
              display: "block",
              color: "var(--gray)",
              fontSize: "14px",
              lineHeight: "1.4"
            }}
            data-ve-edit="testimonial-form-permission"
            dangerouslySetInnerHTML={{ __html: permission }}
          />
        )}

        <div className="form-actions">
          {submit && (
            <button
              type="submit"
              className="btn"
              data-ve-edit="testimonial-form-submit"
            >
              {submit}
            </button>
          )}
        </div>

        {footer && (
          <p
            style={{
              marginTop: "12px",
              color: "var(--gray)",
              fontSize: "13px",
              textAlign: "center"
            }}
            data-ve-edit="testimonial-form-footer"
            dangerouslySetInnerHTML={{ __html: footer }}
          />
        )}
      </form>
    </section>
  );
}
