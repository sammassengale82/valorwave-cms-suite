import React from "react";
import SectionFields from "./SectionFields";
import FieldEditor from "./FieldEditor";

type Props = {
  section: any;
};

export default function SectionBlock({ section }: Props) {
  return (
    <div className="cms-section-block">
      <h4>{section.type}</h4>
      <FieldEditor section={section} />
    </div>
  );
}
