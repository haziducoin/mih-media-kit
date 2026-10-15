import { createFileRoute } from "@tanstack/react-router";

import mediaKit from "@/content/media-kit.json";

const ADMIN_CODE = process.env.ADMIN_CODE || "MIH-ADMIN-2026";
const REPO_OWNER = process.env.GITHUB_OWNER || "haziducoin";
const REPO_NAME = process.env.GITHUB_REPO || "mih-media-kit";
const REPO_BRANCH = process.env.GITHUB_BRANCH || "main";
const CONTENT_PATH = process.env.MEDIA_KIT_CONTENT_PATH || "src/content/media-kit.json";

export const Route = createFileRoute("/api/media-kit-content")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const body = await request.json();
          if (body?.code !== ADMIN_CODE) {
            return json({ error: "Code incorrect." }, 401);
          }

          const latest = await readLatestContent();
          return json({
            ok: true,
            content: latest ?? mediaKit,
            source: latest ? "github" : "deploiement",
          });
        } catch {
          return json({ error: "Requete invalide." }, 400);
        }
      },
    },
  },
});

// Une publication met 1 a 2 minutes a etre deployee : on lit la version la plus
// recente directement dans GitHub pour que l'admin ne reparte pas d'un contenu perime.
async function readLatestContent(): Promise<unknown> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONTENT_PATH}?ref=${REPO_BRANCH}`,
      {
        headers: {
          accept: "application/vnd.github.raw+json",
          authorization: `Bearer ${token}`,
          "x-github-api-version": "2022-11-28",
        },
      },
    );
    if (!response.ok) return null;
    return JSON.parse(await response.text());
  } catch {
    return null;
  }
}

function json(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
