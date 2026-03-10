import React from "react";

export default function WysiwygToolbar({ exec }: any) {
  return (
    <div className="wysiwyg-toolbar">
      <button onClick={() => exec("bold")}>B</button>
      <button onClick={() => exec("italic")}>I</button>
      <button onClick={() => exec("underline")}>U</button>
      <button onClick={() => exec("insertUnorderedList")}>• List</button>
      <button onClick={() => exec("insertOrderedList")}>1. List</button>
      <button onClick={() => exec("formatBlock", "<h1>")}>H1</button>
      <button onClick={() => exec("formatBlock", "<h2>")}>H2</button>
      <button onClick={() => exec("formatBlock", "<p>")}>P</button>
    </div>
  );
}