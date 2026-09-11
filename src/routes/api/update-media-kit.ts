import { createFileRoute } from "@tanstack/react-router";

const REPO_OWNER = process.env.GITHUB_OWNER || "haziducoin";
const REPO_NAME = process.env.GITHUB_REPO || "mih-media-kit";
const REPO_BRANCH = process.env.GITHUB_BRANCH || "main";
const CONTENT_PATH = process.env.MEDIA_KIT_CONTENT_PATH || "src/content/media-kit.json";
const ADMIN_CODE = process.env.ADMIN_CODE || "MIH-ADMIN-2026";

type GithubFileResponse = {
  sha?: string;
  message?: string;
};

export const Route = createFileRoute("/api/update-media-kit")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const body = await request.json();
          if (body?.code !== ADMIN_CODE) {
            return json({ error: "Code incorrect." }, 401);
          }

          if (!isValidContent(body?.content)) {
            return json({ error: "Contenu invalide." }, 400);
          }

          const token = process.env.GITHUB_TOKEN;
          if (!token) {
            return json(
              {
                error:
                  "Publication non configuree : ajoute GITHUB_TOKEN dans les variables Vercel.",
              },
              500,
            );
          }

          const headers = {
            accept: "application/vnd.github+json",
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
            "x-github-api-version": "2022-11-28",
          };

          const fileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONTENT_PATH}?ref=${REPO_BRANCH}`;
          const currentFile = await fetch(fileUrl, { headers });
          const currentFileData = (await currentFile.json()) as GithubFileResponse;

          if (!currentFile.ok || !currentFileData.sha) {
            return json(
              {
                error:
                  currentFileData.message ||
                  "Impossible de lire le fichier actuel dans GitHub.",
              },
              500,
            );
          }

          const formattedContent = `${JSON.stringify(body.content, null, 2)}\n`;
          const updateResponse = await fetch(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONTENT_PATH}`,
            {
              method: "PUT",
              headers,
              body: JSON.stringify({
                branch: REPO_BRANCH,
                message: "Update MIH media kit content from admin editor",
                content: Buffer.from(formattedContent, "utf8").toString("base64"),
                sha: currentFileData.sha,
              }),
            },
          );

          const updateData = (await updateResponse.json()) as GithubFileResponse;
          if (!updateResponse.ok) {
            return json(
              { error: updateData.message || "GitHub a refuse la mise a jour." },
              500,
            );
          }

          return json({ ok: true });
        } catch (error) {
          return json(
            {
              error:
                error instanceof Error
                  ? error.message
                  : "Erreur inconnue pendant la publication.",
            },
            500,
          );
        }
      },
    },
  },
});

function isValidContent(content: unknown) {
  if (!content || typeof content !== "object") return false;

  const value = content as Record<string, unknown>;
  return Boolean(
    value.links &&
      value.hero &&
      value.propos &&
      value.concept &&
      value.performances &&
      value.audience &&
      value.acquisition &&
      value.expertise &&
      value.offers &&
      value.contact,
  );
}

function json(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
