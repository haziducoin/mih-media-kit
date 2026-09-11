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

type GithubHeaders = {
  accept: string;
  authorization: string;
  "content-type": string;
  "x-github-api-version": string;
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

          const contentWithPublishedImages = await publishEmbeddedImages({
            content: body.content,
            headers,
          });

          const formattedContent = `${JSON.stringify(contentWithPublishedImages, null, 2)}\n`;
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

          return json({ ok: true, content: contentWithPublishedImages });
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

async function publishEmbeddedImages({
  content,
  headers,
}: {
  content: unknown;
  headers: GithubHeaders;
}) {
  const cloned = structuredClone(content);
  let uploadIndex = 0;

  async function walk(value: unknown): Promise<unknown> {
    if (Array.isArray(value)) {
      return Promise.all(value.map((item) => walk(item)));
    }

    if (value && typeof value === "object") {
      const next: Record<string, unknown> = {};
      for (const [key, childValue] of Object.entries(value)) {
        next[key] = await walk(childValue);
      }
      return next;
    }

    if (typeof value === "string" && value.startsWith("data:image/")) {
      uploadIndex += 1;
      return uploadImageDataUrl(value, uploadIndex, headers);
    }

    return value;
  }

  return walk(cloned);
}

async function uploadImageDataUrl(
  dataUrl: string,
  uploadIndex: number,
  headers: GithubHeaders,
) {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!match) {
    throw new Error("Image deposee invalide.");
  }

  const mimeType = match[1];
  const base64Content = match[2];
  const extension = extensionFromMimeType(mimeType);
  if (!extension) {
    throw new Error(`Format image non accepte : ${mimeType}`);
  }

  const filePath = `public/media/uploads/media-kit-${Date.now()}-${uploadIndex}.${extension}`;
  const uploadResponse = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify({
        branch: REPO_BRANCH,
        message: `Upload media kit image ${uploadIndex}`,
        content: base64Content,
      }),
    },
  );

  const uploadData = (await uploadResponse.json()) as GithubFileResponse;
  if (!uploadResponse.ok) {
    throw new Error(uploadData.message || "Impossible d'envoyer une image dans GitHub.");
  }

  return `/${filePath.replace(/^public\//, "")}`;
}

function extensionFromMimeType(mimeType: string) {
  const extensions: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg",
  };

  return extensions[mimeType];
}

function json(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
