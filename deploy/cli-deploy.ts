#!/usr/bin/env node

import { publishDraft } from "./publishToGitHub.js";

async function run() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error("Missing GITHUB_TOKEN");
    process.exit(1);
  }

  console.log("Publishing draft → GitHub…");
  await publishDraft(token);
  console.log("Publish complete.");
}

run();