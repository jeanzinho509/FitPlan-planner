import express from 'express';
// server/_core/vite.ts
import type { Express, Request, Response } from "express";
import type { ViteDevServer } from "vite";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

let vite: ViteDevServer | undefined;

export async function setupVite(app: Express, server: any) {
  const { createServer } = await import("vite");

  vite = await createServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  app.use(vite.middlewares);

  app.use("*", async (req: Request, res: Response) => {
    try {
      const url = req.originalUrl;
      let template = await vite!.transformIndexHtml(url, `
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>FitPlan</title>
          </head>
          <body>
            <div id="root"></div>
            <script type="module" src="/src/main.tsx"></script>
          </body>
        </html>
      `);
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      vite!.ssrFixStacktrace(e as any);
      console.error(e);
      res.status(500).end((e as any).message);
    }
  });
}

export function serveStatic(app: Express) {
  const distDir = join(__dirname, "../../dist/public");
  app.use(express.static(distDir));
  
  // SPA fallback
  app.use("*", (req: Request, res: Response) => {
    res.sendFile(join(distDir, "index.html"));
  });
}