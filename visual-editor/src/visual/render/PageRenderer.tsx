import React from "react";
import { SectionRenderer } from "./SectionRenderer";

export function PageRenderer({ sections }: { sections: any[] }) {
  return (
    <>
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </>
  );
}
