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
    <section className="testimonial-form-section">
      {heading && <h2>{heading}</h2>}
      <form className="testimonial-form">
        {name && <label dangerouslySetInnerHTML={{ __html: name }} />}
        {email && <label dangerouslySetInnerHTML={{ __html: email }} />}
        {eventType && <label dangerouslySetInnerHTML={{ __html: eventType }} />}
        {date && <label dangerouslySetInnerHTML={{ __html: date }} />}
        {message && <label dangerouslySetInnerHTML={{ __html: message }} />}
        {permission && (
          <div dangerouslySetInnerHTML={{ __html: permission }} />
        )}
        {submit && <button type="submit">{submit}</button>}
      </form>
      {footer && <p dangerouslySetInnerHTML={{ __html: footer }} />}
    </section>
  );
}