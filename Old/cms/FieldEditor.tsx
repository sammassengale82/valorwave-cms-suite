import React from "react";

export default function FieldEditor({ field, update }: any) {
  function setValue(key: string, value: string) {
    update({ ...field, [key]: value });
  }

  return (
    <div className="field-editor">
      <label>ID</label>
      <input
        type="text"
        value={field.id}
        onChange={(e) => setValue("id", e.target.value)}
      />

      <label>Label</label>
      <input
        type="text"
        value={field.label}
        onChange={(e) => setValue("label", e.target.value)}
      />

      <label>Type</label>
      <select
        value={field.type}
        onChange={(e) => setValue("type", e.target.value)}
      >
        <option value="text">Text</option>
        <option value="slug">Slug</option>
        <option value="richtext">Rich Text</option>
        <option value="image">Image</option>
        <option value="number">Number</option>
        <option value="boolean">Boolean</option>
      </select>
    </div>
  );
}