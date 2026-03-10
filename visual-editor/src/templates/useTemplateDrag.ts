import { useState } from "react";
import type { TemplateEntry } from "../../../templates";

export function useTemplateDrag() {
  const [dragging, setDragging] = useState<TemplateEntry | null>(null);

  function startDrag(template: TemplateEntry) {
    setDragging(template);
  }

  function endDrag() {
    setDragging(null);
  }

  return { dragging, startDrag, endDrag };
}