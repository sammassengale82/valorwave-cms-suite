// src/visual/compile/compileNode.ts

import { toComponentName } from "./toComponentName";

export interface CompiledNode {
  id: string;
  type: string;
  component: string;
  props: Record<string, any>;
  children: never[]; // always empty for this architecture
}

export function compileNode(node: any): CompiledNode {
  return {
    id: node.id,
    type: node.type,
    component: toComponentName(node.id) || node.type,
    props: node.props || {},
    children: []
  };
}
