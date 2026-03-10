import { useState } from "react";

export function useTemplateDrag() {
  const [dragging, setDragging] = useState(null);

  function startDrag(template) {
    setDragging(template);
  }

  function endDrag() {
    setDragging(null);
  }

  return { dragging, startDrag, endDrag };
}