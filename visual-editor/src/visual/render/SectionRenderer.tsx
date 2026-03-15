import React from "react";
import { renderSectionComponent } from "./renderSectionComponent";

export default function SectionRenderer({ node }: { node: any }) {
  // SECTION
  if (node.type === "section") {
    const SectionComponent = renderSectionComponent(node.component, node.props);

    return (
      <div style={node.styles?.desktop || {}}>
        {SectionComponent}

        {node.children?.map((child: any) => (
          <SectionRenderer key={child.id} node={child} />
        ))}
      </div>
    );
  }

  // BLOCK
  if (node.type === "block") {
    return (
      <div style={node.styles?.desktop || {}}>
        {node.children?.map((child: any) => (
          <SectionRenderer key={child.id} node={child} />
        ))}
      </div>
    );
  }

  return null;
}
