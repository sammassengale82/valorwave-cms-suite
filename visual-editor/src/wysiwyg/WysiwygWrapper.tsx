import React from "react";
import InlineTextEditor from "./InlineTextEditor";
import InlineImageEditor from "./InlineImageEditor";
import WysiwygToolbar from "./WysiwygToolbar";

export default function WysiwygWrapper({ node, children }: any) {
  function exec(cmd: string, value?: string) {
    document.execCommand(cmd, false, value);
  }

  const isText = node.type === "text";
  const isImage = node.type === "image";

  return (
    <div className="wysiwyg-wrapper">
      <WysiwygToolbar exec={exec} />

      {isText && <InlineTextEditor node={node} />}
      {isImage && <InlineImageEditor node={node} />}

      {!isText && !isImage && children}
    </div>
  );
}