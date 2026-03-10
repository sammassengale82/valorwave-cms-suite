import type { TemplateEntry } from "../../../templates";

export function getTemplateVersion(template: TemplateEntry): number {
  return (template.data as any).version || 1;
}

export function hasTemplateUpdate(
  template: TemplateEntry,
  instanceVersion: number | undefined | null
): boolean {
  const tplVersion = getTemplateVersion(template);
  if (!instanceVersion) return false;
  return tplVersion > instanceVersion;
}