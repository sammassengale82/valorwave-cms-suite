import React from "react";

interface Props {
  heading?: string;
  name?: string;
  email?: string;
  eventType?: string;
  date?: string;
  message?: string;
  permission?: string;
  submit?: string;
  footer?: string;
}

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
}: Props) {
  return (
    <section className="testimonial-form-section">
      {heading && <h2>{heading}</h2>}
      <form className="testimonial-form">
        {name && <label dangerouslySetInnerHTML={{ __html: name }} />}
        {email && <label dangerouslySetInnerHTML={{ __html: email }} />}
        {eventType && (
          <label dangerouslySetInnerHTML={{ __html: eventType }} />
        )}
        {date && <label dangerouslySetInnerHTML={{ __html: date }} />}
        {message && (
          <label dangerouslySetInnerHTML={{ __html: message }} />
        )}
        {permission && (
          <div
            className="testimonial-permission"
            dangerouslySetInnerHTML={{ __html: permission }}
          />
        )}
        {submit && <button type="submit">{submit}</button>}
      </form>
      {footer && (
        <p
          className="testimonial-form-footer"
          dangerouslySetInnerHTML={{ __html: footer }}
        />
      )}
    </section>
  );
}
