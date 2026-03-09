import { Hono } from "hono";
import { GitHubSync } from "../sync";
import { getLocalRoot } from "../utils/localRoot";

export const syncRoute = new Hono();

syncRoute.post("/", async (c) => {
  try {
    const token = c.env.GITHUB_TOKEN;
    const sync = new GitHubSync(token);

    const localRoot = getLocalRoot();
    await sync.syncAll(localRoot);

    return c.json({ ok: true });
  } catch (err) {
    console.error("Sync error:", err);
    return c.json({ ok: false, error: String(err) }, 500);
  }
});