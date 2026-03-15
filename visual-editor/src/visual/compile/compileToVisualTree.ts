import { compileNode } from "./compileNode";

export function compileToVisualTree(canvasTree: any[]) {
  return {
    root: canvasTree.map(compileNode)
  };
}
