// src/visual/sections/TestimonialFormSection.tsx
import React from "react";

export function TestimonialFormSection(props: any) {
  return (
    <section id="submit-testimonial" data-theme-scope="all">
      {props["testimonial-form-heading"] && (
        <h2>{props["testimonial-form-heading"].text}</h2>
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

        {/* Name */}
        <input
          type="text"
          name="client_name"
          placeholder={props["testimonial-form-name"]?.text || "Your Name"}
          required
        />

        {/* Email */}
        <input
          type="email"
          name="client_email"
          placeholder={props["testimonial-form-email"]?.text || "Your Email (optional)"}
        />

        {/* Event Type */}
        <input
          type="text"
          name="event_type"
          placeholder={
            props["testimonial-form-event-type"]?.text ||
            "Event Type (Wedding, Birthday, Corporate, etc.)"
          }
          required
        />

        {/* Event Date */}
        <input
          type="date"
          name="event_date"
          placeholder={props["testimonial-form-date"]?.text || "Event Date"}
        />

        {/* Rating */}
        <select
          name="rating"
          required
          defaultValue=""
          style={{
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #0b1220",
            background: "rgba(248,250,252,0.92)",
            fontSize: "16px",
            color: "#0b1220"
         }}
        >
         <option value="" disabled>
           Rating
         </option>
         <option value="5">5 - Excellent</option>
         <option value="4">4 - Great</option>
         <option value="3">3 - Good</option>
         <option value="2">2 - Fair</option>
         <option value="1">1 - Poor</option>
       </select>

        {/* Testimonial */}
        <textarea
          name="testimonial"
          placeholder={
            props["testimonial-form-message"]?.text ||
            "Write your testimonial here..."
          }
          required
        />

        {/* Permission */}
        <label
          style={{
            display: "block",
            color: "var(--gray)",
            fontSize: "14px",
            lineHeight: 1.4
          }}
        >
          <input type="checkbox" name="permission" value="Yes" required />{" "}
          {props["testimonial-form-permission"]?.text ||
            "I give Valor Wave Entertainment permission to use my testimonial on the website."}
        </label>

        <div className="form-actions">
          <button type="submit" className="btn">
            {props["testimonial-form-submit"]?.text || "Send Testimonial"}
          </button>
        </div>

        {props["testimonial-form-footer"] && (
          <p
            style={{
              marginTop: "12px",
              color: "var(--gray)",
              fontSize: "13px",
              textAlign: "center"
            }}
          >
            {props["testimonial-form-footer"].text}
          </p>
        )}
      </form>
    </section>
  );
}
