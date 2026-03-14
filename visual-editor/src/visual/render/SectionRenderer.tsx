import React from "react";
import { renderSectionComponent } from "./renderSectionComponent";

export default function SectionRenderer({ node }: any) {
  return (
    <div style={node.styles?.desktop || {}}>
      {renderSectionComponent(node.component, node.props)}
      {(node.children || []).map((child: any) => (
        <SectionRenderer key={child.id} node={child} />
      ))}
    </div>
  );
}
