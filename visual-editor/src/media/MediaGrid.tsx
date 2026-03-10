import React from "react";

export default function MediaGrid({ items }: any) {
  return (
    <div className="media-grid">
      {items.map((item: any) => (
        <div key={item.id} className="media-item">
          <img src={item.url} alt="" />
          <div className="media-name">{item.name}</div>
        </div>
      ))}
    </div>
  );
}