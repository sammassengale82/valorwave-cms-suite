import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { templates } from "../templates/index.js";

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const t of templates) {
    const url = `http://localhost:3000/preview/${t.id}`;
    await page.goto(url, { waitUntil: "networkidle0" });
    const outDir = path.join("templates", t.id);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const outPath = path.join(outDir, "preview.png");
    await page.screenshot({ path: outPath, fullPage: true });
  }

  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});