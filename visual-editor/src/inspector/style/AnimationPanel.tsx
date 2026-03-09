import React from "react";
import { useCanvasState } from "../../canvas/CanvasState";
import { useEditorState } from "../../state/EditorState";
import type { VisualNode, AnimationConfig } from "../../canvas/VisualTree";

const ANIMATION_TYPES = [
  "fade-in",
  "fade-up",
  "fade-down",
  "fade-left",
  "fade-right",
  "zoom-in",
  "zoom-out",
  "rotate-in",
  "flip",
  "blur-in",
  "skew-in",
  "slide-up",
  "slide-down",
  "parallax",
  "scroll-speed",
  "scroll-progress"
];

export default function AnimationPanel({ node }: { node: VisualNode }) {
  const updateStyle = useCanvasState((s) => s.updateStyle);
  const device = useEditorState((s) => s.device);

  const updateAnimations = useCanvasState((s) => s.updateAnimations);

  const anims = node.animations?.[device] || [];

  function update(index: number, field: keyof AnimationConfig, value: any) {
    updateAnimations(node.id, device, index, field, value);
  }

  function addAnimation() {
    updateAnimations(node.id, device, "add");
  }

  function removeAnimation(index: number) {
    updateAnimations(node.id, device, "remove", index);
  }

  return (
    <div className="panel animation-panel">
      <h4>Animations</h4>

      {anims.map((anim, i) => (
        <div key={i} className="animation-item">
          <label>Type</label>
          <select
            value={anim.type}
            onChange={(e) => update(i, "type", e.target.value)}
          >
            {ANIMATION_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <label>Duration (ms)</label>
          <input
            type="number"
            value={anim.duration}
            onChange={(e) => update(i, "duration", Number(e.target.value))}
          />

          <label>Delay (ms)</label>
          <input
            type="number"
            value={anim.delay}
            onChange={(e) => update(i, "delay", Number(e.target.value))}
          />

          <label>Easing</label>
          <input
            value={anim.easing}
            onChange={(e) => update(i, "easing", e.target.value)}
          />

          <label>Trigger</label>
          <select
            value={anim.trigger}
            onChange={(e) => update(i, "trigger", e.target.value)}
          >
            <option value="on-load">On Load</option>
            <option value="on-visible">On Visible</option>
            <option value="on-scroll">On Scroll</option>
          </select>

          {(anim.type === "parallax" ||
            anim.type === "scroll-speed" ||
            anim.type === "scroll-progress") && (
            <>
              <label>Speed</label>
              <input
                type="number"
                value={anim.speed || 1}
                onChange={(e) => update(i, "speed", Number(e.target.value))}
              />

              <label>Threshold</label>
              <input
                type="number"
                value={anim.threshold || 0}
                onChange={(e) =>
                  update(i, "threshold", Number(e.target.value))
                }
              />
            </>
          )}

          <label>Loop</label>
          <input
            type="checkbox"
            checked={anim.loop || false}
            onChange={(e) => update(i, "loop", e.target.checked)}
          />

          <button className="remove-anim" onClick={() => removeAnimation(i)}>
            Remove
          </button>
        </div>
      ))}

      <button className="add-anim" onClick={addAnimation}>
        + Add Animation
      </button>
    </div>
  );
}