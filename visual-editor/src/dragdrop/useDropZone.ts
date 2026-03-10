export function useDropZone() {
  function getDropPosition(e: React.MouseEvent, container: HTMLElement) {
    const rect = container.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  return { getDropPosition };
}