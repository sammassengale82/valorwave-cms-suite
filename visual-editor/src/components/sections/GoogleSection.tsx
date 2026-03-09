import React from "react";

export default function GoogleSection({ analytics }) {
  return (
    <section className="google-section">
      <h2>Google Integrations</h2>
      {analytics && <p>Analytics ID: {analytics}</p>}
    </section>
  );
}
