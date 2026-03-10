import type { TemplateEntry } from "../../../templates";

export function getTemplateVersionFromTemplate(t: TemplateEntry): number {
  return t.version || (t.data as any).version || 1;
}

export function getInstanceTemplateVersion(node: any): number {
  return node.templateVersion || node.version || 1;
}

export function hasTemplateUpdateForNode(
  node: any,
  template: TemplateEntry | undefined
): boolean {
  if (!template) return false;
  const tplVersion = getTemplateVersionFromTemplate(template);
  const instanceVersion = getInstanceTemplateVersion(node);
  return tplVersion > instanceVersion;
}