import { createFileRoute } from "@tanstack/react-router";

import mediaKit from "@/content/media-kit.json";

const ADMIN_CODE = process.env.ADMIN_CODE || "MIH-ADMIN-2026";

export const Route = createFileRoute("/api/media-kit-content")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const body = await request.json();
          if (body?.code !== ADMIN_CODE) {
            return json({ error: "Code incorrect." }, 401);
          }

          return json({ ok: true, content: mediaKit });
        } catch {
          return json({ error: "Requete invalide." }, 400);
        }
      },
    },
  },
});

function json(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
