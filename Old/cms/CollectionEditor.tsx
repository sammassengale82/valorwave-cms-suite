import React from "react";
import FieldEditor from "./FieldEditor";

export default function CollectionEditor({ collection, update }: any) {
  function updateField(updatedField: any) {
    update({
      ...collection,
      fields: collection.fields.map((f: any) =>
        f.id === updatedField.id ? updatedField : f
      )
    });
  }

  return (
    <div className="collection-editor">
      <div className="collection-header">
        <h3>{collection.name}</h3>
      </div>

      <div className="collection-fields">
        {collection.fields.map((field: any) => (
          <FieldEditor
            key={field.id}
            field={field}
            update={updateField}
          />
        ))}
      </div>
    </div>
  );
}