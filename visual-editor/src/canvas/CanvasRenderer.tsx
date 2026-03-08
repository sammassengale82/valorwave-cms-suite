import React from "react";
import SectionBlock from "../components/SectionBlock";

export default function CanvasRenderer({ data }: { data: any }) {
  return (
    <div className="canvas-renderer">
      {/* Later: map sections dynamically */}
      <SectionBlock id="hero" data={data} />
      <SectionBlock id="services" data={data} />
      {/* ... */}
    </div>
  );
}