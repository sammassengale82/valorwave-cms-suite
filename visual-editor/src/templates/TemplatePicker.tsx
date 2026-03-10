import React, { useState } from "react";
import { templates } from "../../../templates";
import TemplateCard from "./TemplateCard";
import { useCanvasState } from "../canvas/CanvasState";
import "./templates.css";

const categories = ["All", "Hero", "Header", "Services", "About", "Testimonials", "Forms", "Footer", "Utility", "Meta"];

export default function TemplatePicker() {
  const addSection = useCanvasState((s) => s.addSection);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  function handleSelect(t: any) {
    const root = t.data.tree[0];
    addSection(JSON.parse(JSON.stringify(root)));
  }

  const filtered = templates.filter((t) => {
    const matchCategory = category === "All" || t.category === category;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="template-picker-wrap">
      <div className="template-controls">
        <input
          className="template-search"
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="template-categories">
          {categories.map((c) => (
            <button
              key={c}
              className={c === category ? "cat active" : "cat"}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="template-picker">
        {filtered.map((t) => (
          <TemplateCard key={t.id} template={t} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
}