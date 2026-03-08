export const API_BASE = "http://localhost:1818";

async function handle(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  const ct = res.headers.get("Content-Type") || "";
  if (ct.includes("application/json")) return res.json();
  return res.text();
}

export async function getDraft() {
  const res = await fetch(`${API_BASE}/draft.json`);
  return handle(res);
}

export async function saveDraft(data: any) {
  const res = await fetch(`${API_BASE}/draft.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return handle(res);
}

export async function publish() {
  const res = await fetch(`${API_BASE}/publish`, { method: "POST" });
  return handle(res);
}

export async function syncPull() {
  const res = await fetch(`${API_BASE}/sync/pull`, { method: "POST" });
  return handle(res);
}

export async function syncPush() {
  const res = await fetch(`${API_BASE}/sync/push`, { method: "POST" });
  return handle(res);
}

export async function getSiteTheme() {
  const res = await fetch(`${API_BASE}/site-theme.txt`);
  return handle(res);
}

export async function setSiteTheme(theme: string) {
  const res = await fetch(`${API_BASE}/site-theme.txt`, {
    method: "PUT",
    headers: { "Content-Type": "text/plain" },
    body: theme
  });
  return handle(res);
}

export async function getCmsTheme() {
  const res = await fetch(`${API_BASE}/cms-theme.txt`);
  return handle(res);
}

export async function setCmsTheme(theme: string) {
  const res = await fetch(`${API_BASE}/cms-theme.txt`, {
    method: "PUT",
    headers: { "Content-Type": "text/plain" },
    body: theme
  });
  return handle(res);
}

export async function resetCMS() {
  const res = await fetch(`${API_BASE}/reset-cms`, { method: "POST" });
  return handle(res);
}

export async function uploadImage(filename: string, bytes: Uint8Array) {
  const res = await fetch(`${API_BASE}/upload/${encodeURIComponent(filename)}`, {
    method: "POST",
    body: bytes
  });
  return handle(res);
}
