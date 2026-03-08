import React from "react";
import FieldEditor from "./FieldEditor";

export default function CMSPanel() {
  return (
    <div className="cms-panel-root">
      <h3>CMS Fields</h3>
      <FieldEditor field="hero-h1" label="Hero Heading" />
      <FieldEditor field="hero-tagline" label="Hero Tagline" />
      {/* ... */}
    </div>
  );
}