export function toComponentName(templateId: string): string {
  return (
    templateId
      .split("-")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join("") + "Section"
  );
}
