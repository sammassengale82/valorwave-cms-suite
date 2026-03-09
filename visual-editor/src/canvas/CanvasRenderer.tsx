import React from "react";
import { useCanvasState } from "./CanvasState";
import { useEditorState } from "../state/EditorState";
import { SectionBlock } from "../components/SectionBlock";
import { BlockWrapper } from "../components/BlockWrapper";
import type { VisualNode, AnimationConfig } from "./VisualTree";

function buildAnimationAttributes(
  animations: AnimationConfig[] | undefined
): Record<string, string> {
  if (!animations || animations.length === 0) return {};

  // For now, we apply only the FIRST animation in the list.
  // Later we can support multi-animation stacks.
  const anim = animations[0];

  const attrs: Record<string, string> = {
    "data-anim": anim.type,
    "data-anim-duration": String(anim.duration),
    "data-anim-delay": String(anim.delay),
    "data-anim-easing": anim.easing,
    "data-anim-trigger": anim.trigger,
  };

  if (anim.speed !== undefined) {
    attrs["data-anim-speed"] = String(anim.speed);
  }

  if (anim.threshold !== undefined) {
    attrs["data-anim-threshold"] = String(anim.threshold);
  }

  if (anim.loop !== undefined) {
    attrs["data-anim-loop"] = String(anim.loop);
  }

  return attrs;
}

function renderNode(node: VisualNode, device: string) {
  const anims = node.animations?.[device] || [];
  const animAttrs = buildAnimationAttributes(anims);

  if (node.type === "section") {
    return (
      <SectionBlock
        key={node.id}
        node={node}
        animAttrs={animAttrs}
      />
    );
  }

  if (node.type === "block") {
    return (
      <BlockWrapper
        key={node.id}
        node={node}
        animAttrs={animAttrs}
      />
    );
  }

  return null;
}

export default function CanvasRenderer() {
  const tree = useCanvasState((s) => s.tree);
  const device = useEditorState((s) => s.device);

  return (
    <div className={`canvas-renderer device-${device}`}>
      {tree.root.map((node) => renderNode(node, device))}
    </div>
  );
}