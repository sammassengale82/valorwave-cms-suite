export function createSafeHtml(text?: string): { __html: string } {
  return { __html: text ?? "" };
}