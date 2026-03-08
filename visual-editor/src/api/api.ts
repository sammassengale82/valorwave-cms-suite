export const API_BASE = "http://localhost:1818";

export async function getDraft() {
  const res = await fetch(`${API_BASE}/draft.json`);
  return res.json();
}

export async function saveDraft(data: any) {
  await fetch(`${API_BASE}/draft.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

export async function publish() {
  await fetch(`${API_BASE}/publish`, { method: "POST" });
}

export async function syncPull() {
  await fetch(`${API_BASE}/sync/pull`, { method: "POST" });
}

export async function syncPush() {
  await fetch(`${API_BASE}/sync/push`, { method: "POST" });
}