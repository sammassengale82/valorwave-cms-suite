// src/canvas/loadTemplate.ts
export async function loadTemplate() {
  const res = await fetch("/src/templates/template/template.data.json");
  const json = await res.json();

  console.log("Loaded template:", json); // ⭐ Add this

  return json.sections || [];
}
