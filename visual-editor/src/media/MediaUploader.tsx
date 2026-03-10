import React from "react";

export default function MediaUploader({ onUpload }: any) {
  function handleUpload(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    const id = crypto.randomUUID();
    const url = `/uploads/${id}-${file.name}`;

    const reader = new FileReader();
    reader.onload = () => {
      const a = document.createElement("a");
      a.href = reader.result as string;
      a.download = `${id}-${file.name}`;
      a.click();

      onUpload({
        id,
        name: file.name,
        url
      });
    };

    reader.readAsDataURL(file);
  }

  return (
    <label className="media-upload-btn">
      Upload
      <input type="file" accept="image/*" onChange={handleUpload} />
    </label>
  );
}