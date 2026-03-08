import React from "react";

interface Props {
  analytics?: string;
}

export default function GoogleSection({ analytics }: Props) {
  return (
    <section className="google-section">
      <h2>Google Integrations</h2>
      {analytics && <p>Analytics ID: {analytics}</p>}
    </section>
  );
}