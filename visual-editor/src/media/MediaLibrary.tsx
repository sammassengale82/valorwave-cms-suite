import React, { useEffect, useState } from "react";
import MediaGrid from "./MediaGrid";
import MediaUploader from "./MediaUploader";
import "./media.css";

export default function MediaLibrary() {
  const [media, setMedia] = useState<any[]>([]);

  useEffect(() => {
    fetch("/cms/media/media.json")
      .then((res) => res.json())
      .then((data) => setMedia(data.items || []));
  }, []);

  function saveMedia(updated: any[]) {
    const blob = new Blob(
      [JSON.stringify({ items: updated }, null, 2)],
      { type: "application/json" }
    );
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "media.json";
    a.click();
  }

  function addItem(item: any) {
    const updated = [...media, item];
    setMedia(updated);
    saveMedia(updated);
  }

  return (
    <div className="media-library">
      <div className="media-header">
        <h2>Media Library</h2>
        <MediaUploader onUpload={addItem} />
      </div>

      <MediaGrid items={media} />
    </div>
  );
}