// src/editor/panels/SiteSettingsPanel.tsx
import React from "react";
import { useCanvasState } from "../../canvas/CanvasState";

export default function SiteSettingsPanel() {
  const templateData = useCanvasState((s) => s.templateData);
  const updateSiteSettings = useCanvasState((s) => s.updateSiteSettings);

  if (!templateData?.site) {
    return (
      <div className="site-settings-panel">
        <h2>Site Settings</h2>
        <p>No site data found.</p>
      </div>
    );
  }

  const site = templateData.site;

  function handleChange(key: string, value: string) {
    updateSiteSettings({ [key]: value });
  }

  return (
    <div className="site-settings-panel">
      <h2>Site Settings</h2>

      <Field
        label="Meta Title"
        value={site.meta_title || ""}
        onChange={(v) => handleChange("meta_title", v)}
      />
      <Field
        label="Meta Description"
        value={site.meta_description || ""}
        onChange={(v) => handleChange("meta_description", v)}
        multiline
      />
      <Field
        label="Meta Keywords"
        value={site.meta_keywords || ""}
        onChange={(v) => handleChange("meta_keywords", v)}
      />
      <Field
        label="OG Title"
        value={site.og_title || ""}
        onChange={(v) => handleChange("og_title", v)}
      />
      <Field
        label="OG Description"
        value={site.og_description || ""}
        onChange={(v) => handleChange("og_description", v)}
        multiline
      />
      <Field
        label="OG Image URL"
        value={site.og_image || ""}
        onChange={(v) => handleChange("og_image", v)}
      />

      <Field
        label="Google Analytics ID"
        value={site.googleAnalyticsId || ""}
        onChange={(v) => handleChange("googleAnalyticsId", v)}
      />
    </div>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  const { label, value, onChange, multiline } = props;

  return (
    <div className="site-field">
      <label>{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
