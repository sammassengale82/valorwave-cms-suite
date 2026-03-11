import React from "react";
import * as fields from "../cms-panel/fields";

type Props = {
  section: any;
};

export default function FieldEditor({ section }: Props) {
  const config = (fields as any)[section.type];
  if (!config) return null;

  return (
    <div className="cms-field-editor">
      {/* render inputs based on config */}
    </div>
  );
}
