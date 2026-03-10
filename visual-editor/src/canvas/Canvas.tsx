import React, { useRef } from "react";
import { useCanvasState } from "./CanvasState";
import BlockWrapper from "./BlockWrapper";
import SectionWrapper from "./SectionWrapper";

export default function Canvas() {
  const tree = useCanvasState((s) => s.tree);

  return (
    <div className="canvas-container">
      <div className="canvas-content">
        {tree.map((section: any) => (
          <SectionWrapper key={section.id} node={section}>
            {section.children?.map((child: any) => (
              <BlockWrapper key={child.id} node={child}>
                {child.children?.map((c: any) => (
                  <BlockWrapper key={c.id} node={c} />
                ))}
              </BlockWrapper>
            ))}
          </SectionWrapper>
        ))}
      </div>
    </div>
  );
}