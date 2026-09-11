import { createFileRoute } from "@tanstack/react-router";

import mediaKit from "@/content/media-kit.json";

const safeInitialContent = JSON.stringify(mediaKit).replace(/</g, "\\u003c");

const ADMIN_HTML = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Edition Kit Media MIH</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f3f6f8;
        --panel: #ffffff;
        --text: #111827;
        --muted: #64748b;
        --border: #dbe3ea;
        --primary: #08b6c8;
        --dark: #061219;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: var(--bg);
        color: var(--text);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      header {
        position: sticky;
        top: 0;
        z-index: 10;
        border-bottom: 1px solid var(--border);
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(14px);
      }
      .bar, .wrap {
        width: min(1680px, calc(100% - 32px));
        margin: 0 auto;
      }
      .bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 14px 0;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .brand img {
        width: 44px;
        height: 44px;
        border-radius: 10px;
        object-fit: cover;
      }
      h1, h2, h3 { margin: 0; letter-spacing: 0; }
      h1 { font-size: 22px; }
      h2 { font-size: 18px; }
      h3 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--muted); }
      p { color: var(--muted); line-height: 1.55; }
      button, .button {
        border: 0;
        border-radius: 10px;
        background: var(--dark);
        color: white;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        gap: 8px;
        padding: 11px 14px;
        text-decoration: none;
      }
      button.secondary, .button.secondary {
        background: white;
        border: 1px solid var(--border);
        color: var(--text);
      }
      button.danger { background: #b91c1c; }
      button:disabled { cursor: not-allowed; opacity: 0.55; }
      .login {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
      }
      .login-card, section, aside {
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: 18px;
        box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
      }
      .login-card {
        width: min(440px, 100%);
        padding: 28px;
      }
      .login-card input {
        margin-top: 18px;
      }
      input, textarea {
        width: 100%;
        border: 1px solid var(--border);
        border-radius: 10px;
        background: white;
        color: var(--text);
        font: inherit;
        padding: 11px 12px;
        outline: none;
      }
      textarea {
        min-height: 94px;
        resize: vertical;
      }
      input:focus, textarea:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 4px rgba(8, 182, 200, 0.14);
      }
      label {
        display: grid;
        gap: 7px;
        color: var(--muted);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .hidden { display: none !important; }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .wrap {
        display: grid;
        grid-template-columns: minmax(0, 0.92fr) minmax(360px, 0.58fr);
        gap: 18px;
        padding: 22px 0;
        align-items: start;
      }
      section, aside { padding: 18px; }
      .stack { display: grid; gap: 18px; }
      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
      }
      .card {
        border: 1px solid var(--border);
        border-radius: 14px;
        background: #f8fafc;
        padding: 14px;
      }
      .fields { display: grid; gap: 12px; margin-top: 14px; }
      .status {
        margin-top: 14px;
        border-radius: 12px;
        background: #e6fbfe;
        color: #064e57;
        padding: 12px;
        font-size: 13px;
        font-weight: 700;
      }
      .side-panel {
        position: sticky;
        top: 90px;
        display: grid;
        gap: 14px;
        max-height: calc(100vh - 112px);
        overflow: hidden;
      }
      .preview-tools {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
      .preview-tools p {
        margin: 0;
        font-size: 13px;
      }
      .preview-frame {
        width: 100%;
        height: min(70vh, 760px);
        border: 1px solid var(--border);
        border-radius: 14px;
        background: white;
      }
      .json-details summary {
        cursor: pointer;
        color: var(--muted);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      pre {
        max-height: 420px;
        overflow: auto;
        border-radius: 12px;
        background: #061219;
        color: #dbeafe;
        padding: 12px;
        font-size: 11px;
        line-height: 1.5;
      }
      .image-field {
        display: grid;
        gap: 10px;
      }
      .dropzone {
        border: 1.5px dashed #9fb2c2;
        border-radius: 14px;
        background: #f8fafc;
        padding: 14px;
        text-align: center;
        color: var(--muted);
        cursor: pointer;
        transition: border-color 0.18s ease, background 0.18s ease;
      }
      .dropzone strong {
        display: block;
        color: var(--text);
        font-size: 13px;
      }
      .dropzone span {
        display: block;
        margin-top: 4px;
        font-size: 12px;
      }
      .dropzone.dragover {
        border-color: var(--primary);
        background: #e6fbfe;
      }
      .image-preview {
        width: 100%;
        max-height: 160px;
        border-radius: 12px;
        border: 1px solid var(--border);
        object-fit: cover;
        background: white;
      }
      @media (max-width: 900px) {
        .wrap { grid-template-columns: 1fr; }
        .grid { grid-template-columns: 1fr; }
        .side-panel {
          position: static;
          max-height: none;
        }
        .preview-frame {
          height: 620px;
        }
      }
    </style>
  </head>
  <body>
    <main id="login" class="login">
      <div class="login-card">
        <div class="brand">
          <img src="/media/mih-logo.jpeg" alt="MIH" />
          <div>
            <h3>MIH</h3>
            <h1>Edition kit media</h1>
          </div>
        </div>
        <p>Entre le code fourni pour modifier le kit. Aucun compte GitHub n'est nécessaire.</p>
        <input id="code" type="password" placeholder="Code d'acces" autocomplete="current-password" />
        <button id="unlock" style="width: 100%; margin-top: 12px;">Ouvrir l'editeur</button>
        <div id="login-status" class="status hidden"></div>
      </div>
    </main>

    <main id="editor" class="hidden">
      <header>
        <div class="bar">
          <div class="brand">
            <img src="/media/mih-logo.jpeg" alt="MIH" />
            <div>
              <h3>Edition</h3>
              <h1>Kit media MIH</h1>
            </div>
          </div>
          <div class="actions">
            <button id="save" class="secondary">Sauvegarder</button>
            <button id="preview" class="secondary">Apercu</button>
            <button id="download" class="secondary">Telecharger JSON</button>
            <button id="publish">Publier en ligne</button>
            <button id="reset" class="danger">Reset</button>
          </div>
        </div>
      </header>

      <div class="wrap">
        <div id="forms" class="stack"></div>
        <aside class="side-panel">
          <div>
            <div class="preview-tools">
              <div>
                <h2>Apercu live</h2>
                <p>Le rendu se met a jour pendant l'edition.</p>
              </div>
              <button id="refresh-preview" class="secondary" type="button">Actualiser</button>
            </div>
            <div id="status" class="status hidden"></div>
          </div>
          <iframe id="live-preview" class="preview-frame" src="/?preview=1" title="Apercu du kit media"></iframe>
          <details class="json-details">
            <summary>JSON avance</summary>
            <pre id="json"></pre>
          </details>
          <div>
            <h2>Publication</h2>
            <p>Publier en ligne rend la version visible pour tout le monde. Les images deposees sont envoyees automatiquement dans le site.</p>
          </div>
        </aside>
      </div>
    </main>

    <script>
      const INITIAL_CONTENT = ${safeInitialContent};
      const STORAGE_KEY = "mih-media-kit-editor-draft";
      const login = document.getElementById("login");
      const editor = document.getElementById("editor");
      const codeInput = document.getElementById("code");
      const loginStatus = document.getElementById("login-status");
      const forms = document.getElementById("forms");
      const statusBox = document.getElementById("status");
      const jsonBox = document.getElementById("json");
      const livePreview = document.getElementById("live-preview");
      let accessCode = "";
      let content = loadDraft();
      let previewTimer = null;

      function loadDraft() {
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          return stored ? JSON.parse(stored) : structuredClone(INITIAL_CONTENT);
        } catch {
          return structuredClone(INITIAL_CONTENT);
        }
      }

      function showStatus(message, isLogin) {
        const box = isLogin ? loginStatus : statusBox;
        box.textContent = message;
        box.classList.remove("hidden");
      }

      async function unlock() {
        accessCode = codeInput.value.trim();
        if (!accessCode) {
          showStatus("Entre le code d'acces.", true);
          return;
        }

        try {
          const response = await fetch("/api/check-admin-code", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ code: accessCode })
          });
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.error || "Code incorrect.");
          }
          login.classList.add("hidden");
          editor.classList.remove("hidden");
          render();
        } catch (error) {
          showStatus(error.message || "Code incorrect.", true);
        }
      }

      function setByPath(path, value) {
        let target = content;
        for (let i = 0; i < path.length - 1; i += 1) {
          target = target[path[i]];
        }
        const key = path[path.length - 1];
        const oldValue = target[key];
        if (typeof oldValue === "number") {
          target[key] = Number(value) || 0;
        } else {
          target[key] = value;
        }
        updateJson();
        scheduleLivePreview();
      }

      function labelFromKey(key) {
        return String(key)
          .replace(/([A-Z])/g, " $1")
          .replace(/_/g, " ")
          .replace(/^./, function (char) { return char.toUpperCase(); });
      }

      function renderPrimitive(key, value, path) {
        if (isImageField(key, value)) {
          return renderImageField(key, value, path);
        }

        const label = document.createElement("label");
        label.textContent = labelFromKey(key);
        const input = String(value).length > 70 ? document.createElement("textarea") : document.createElement("input");
        input.value = value ?? "";
        input.addEventListener("input", function () { setByPath(path, input.value); });
        label.appendChild(input);
        return label;
      }

      function isImageField(key, value) {
        const keyLooksLikeImage = ["image", "avatar", "logo"].includes(String(key).toLowerCase());
        const valueLooksLikeImage = typeof value === "string" && (
          value.startsWith("data:image/") ||
          /\\.(png|jpe?g|webp|gif|svg)$/i.test(value)
        );
        return keyLooksLikeImage || valueLooksLikeImage;
      }

      function renderImageField(key, value, path) {
        const wrapper = document.createElement("div");
        wrapper.className = "image-field";

        const label = document.createElement("label");
        label.textContent = labelFromKey(key);
        const input = document.createElement("input");
        input.value = value ?? "";
        input.placeholder = "/media/image.png ou URL image";
        input.addEventListener("input", function () { setByPath(path, input.value); });
        label.appendChild(input);
        wrapper.appendChild(label);

        const img = document.createElement("img");
        img.className = "image-preview";
        img.alt = "Apercu image";
        img.src = value || "/media/mih-logo.jpeg";
        wrapper.appendChild(img);

        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/png,image/jpeg,image/webp,image/gif,image/svg+xml";
        fileInput.className = "hidden";

        const dropzone = document.createElement("div");
        dropzone.className = "dropzone";
        dropzone.innerHTML = "<strong>Deposer une image ici</strong><span>PNG, JPG, WEBP, GIF ou SVG. Elle sera publiee avec le site.</span>";

        function useFile(file) {
          if (!file || !file.type.startsWith("image/")) {
            showStatus("Choisis un fichier image valide.");
            return;
          }
          if (file.size > 4 * 1024 * 1024) {
            showStatus("Image trop lourde : limite 4 Mo.");
            return;
          }
          const reader = new FileReader();
          reader.onload = function () {
            const dataUrl = String(reader.result || "");
            input.value = dataUrl;
            img.src = dataUrl;
            setByPath(path, dataUrl);
            showStatus("Image ajoutee au brouillon. Clique sur Publier en ligne pour la rendre publique.");
          };
          reader.readAsDataURL(file);
        }

        fileInput.addEventListener("change", function () {
          useFile(fileInput.files && fileInput.files[0]);
        });
        dropzone.addEventListener("click", function () { fileInput.click(); });
        dropzone.addEventListener("dragover", function (event) {
          event.preventDefault();
          dropzone.classList.add("dragover");
        });
        dropzone.addEventListener("dragleave", function () {
          dropzone.classList.remove("dragover");
        });
        dropzone.addEventListener("drop", function (event) {
          event.preventDefault();
          dropzone.classList.remove("dragover");
          useFile(event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]);
        });

        wrapper.appendChild(fileInput);
        wrapper.appendChild(dropzone);
        return wrapper;
      }

      function renderValue(key, value, path) {
        if (value === null || typeof value !== "object") {
          return renderPrimitive(key, value, path);
        }

        const block = document.createElement("div");
        block.className = "card";
        const title = document.createElement("h3");
        title.textContent = labelFromKey(key);
        block.appendChild(title);
        const fields = document.createElement("div");
        fields.className = "fields";

        if (Array.isArray(value)) {
          value.forEach(function (item, index) {
            fields.appendChild(renderValue(key + " " + (index + 1), item, path.concat(index)));
          });
        } else {
          Object.keys(value).forEach(function (childKey) {
            fields.appendChild(renderValue(childKey, value[childKey], path.concat(childKey)));
          });
        }

        block.appendChild(fields);
        return block;
      }

      function render() {
        forms.innerHTML = "";
        Object.keys(content).forEach(function (key) {
          const section = document.createElement("section");
          const heading = document.createElement("h2");
          heading.textContent = labelFromKey(key);
          section.appendChild(heading);
          const fields = document.createElement("div");
          fields.className = "fields";
          fields.appendChild(renderValue(key, content[key], [key]));
          section.appendChild(fields);
          forms.appendChild(section);
        });
        updateJson();
      }

      function updateJson() {
        jsonBox.textContent = JSON.stringify(content, null, 2);
      }

      function refreshLivePreview() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
        if (livePreview) {
          livePreview.src = "/?preview=1&t=" + Date.now();
        }
      }

      function scheduleLivePreview() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
        clearTimeout(previewTimer);
        previewTimer = setTimeout(refreshLivePreview, 450);
      }

      function saveDraft() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
        showStatus("Brouillon sauvegarde dans ce navigateur.");
      }

      function previewDraft() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
        refreshLivePreview();
        showStatus("Apercu mis a jour.");
      }

      function downloadJson() {
        const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "media-kit.json";
        link.click();
        URL.revokeObjectURL(url);
        showStatus("Fichier JSON telecharge.");
      }

      async function publish() {
        showStatus("Publication en cours...");
        try {
          const response = await fetch("/api/update-media-kit", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ code: accessCode, content })
          });
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.error || "Publication impossible.");
          }
          if (result.content) {
            content = result.content;
            render();
          }
          localStorage.removeItem(STORAGE_KEY);
          showStatus("Publication lancee. Le site sera mis a jour dans une a deux minutes.");
        } catch (error) {
          showStatus(error.message || "Publication en ligne impossible pour le moment.");
        }
      }

      function resetDraft() {
        const firstConfirm = window.confirm(
          "Attention : cette action supprime toutes les modifications non publiees sauvegardees dans ce navigateur. Le site public ne sera pas modifie. Continuer ?"
        );
        if (!firstConfirm) return;

        const typedConfirm = window.prompt(
          "Pour confirmer le reset du brouillon local, ecris exactement RESET."
        );
        if (typedConfirm !== "RESET") {
          showStatus("Reset annule. Le brouillon n'a pas ete modifie.");
          return;
        }

        localStorage.removeItem(STORAGE_KEY);
        content = structuredClone(INITIAL_CONTENT);
        render();
        showStatus("Brouillon local reinitialise. Le site public n'a pas ete modifie.");
      }

      document.getElementById("unlock").addEventListener("click", unlock);
      codeInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") unlock();
      });
      document.getElementById("save").addEventListener("click", saveDraft);
      document.getElementById("preview").addEventListener("click", previewDraft);
      document.getElementById("refresh-preview").addEventListener("click", refreshLivePreview);
      document.getElementById("download").addEventListener("click", downloadJson);
      document.getElementById("publish").addEventListener("click", publish);
      document.getElementById("reset").addEventListener("click", resetDraft);
    </script>
  </body>
</html>`;

export const Route = createFileRoute("/admin/")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(ADMIN_HTML, {
          headers: { "content-type": "text/html; charset=utf-8" },
        });
      },
    },
  },
});
