import React, { useState, useEffect } from "react";
import CollectionEditor from "./CollectionEditor";
import "./schema.css";

export default function SchemaEditor() {
  const [schema, setSchema] = useState<any>(null);

  useEffect(() => {
    fetch("/cms/schema/schema.json")
      .then((res) => res.json())
      .then((data) => setSchema(data));
  }, []);

  function saveSchema() {
    const blob = new Blob([JSON.stringify(schema, null, 2)], {
      type: "application/json"
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "schema.json";
    a.click();
  }

  if (!schema) return null;

  return (
    <div className="schema-editor">
      <div className="schema-header">
        <h2>CMS Schema</h2>
        <button onClick={saveSchema}>Save Schema</button>
      </div>

      <div className="schema-collections">
        {schema.collections.map((col: any) => (
          <CollectionEditor
            key={col.id}
            collection={col}
            update={(updated) => {
              setSchema({
                ...schema,
                collections: schema.collections.map((c: any) =>
                  c.id === updated.id ? updated : c
                )
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}