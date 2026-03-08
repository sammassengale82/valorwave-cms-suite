import React from "react";
import FieldEditor from "../FieldEditor";
import { useCanvasState } from "../../canvas/CanvasState";
import { updateNodeById } from "../../canvas/VisualTree";

export default function NavigationFields({ node }) {
  const setTree = useCanvasState((s) => s.setTree);
  const tree = useCanvasState((s) => s.tree);

  function update(key: string, value: string) {
    const updated = updateNodeById(tree, node.id, (n) => {
      n.props = n.props || {};
      n.props[key] = value;
    });
    setTree(updated);
  }

  return (
    <div className="cms-section">
      <h4>Navigation</h4>

      <FieldEditor label="Services" value={node.props?.services} onChange={(v) => update("services", v)} />
      <FieldEditor label="Availability" value={node.props?.availability} onChange={(v) => update("availability", v)} />
      <FieldEditor label="Hero Discount" value={node.props?.heroDiscount} onChange={(v) => update("heroDiscount", v)} />
      <FieldEditor label="Request Quote" value={node.props?.requestQuote} onChange={(v) => update("requestQuote", v)} />
      <FieldEditor label="Request Quote Link" value={node.props?.requestQuoteHref} onChange={(v) => update("requestQuoteHref", v)} />
      <FieldEditor label="Client Portal" value={node.props?.clientPortal} onChange={(v) => update("clientPortal", v)} />
      <FieldEditor label="Client Portal Link" value={node.props?.clientPortalHref} onChange={(v) => update("clientPortalHref", v)} />
    </div>
  );
}
