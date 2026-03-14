import { compileNode } from "./compileNode";

export function compileToVisualTree(canvasTree: any[]): any {
  return {
    root: canvasTree.map(compileNode)
  };
}
