# Edition du kit media sans compte GitHub

## Lien a envoyer

`https://partenaires.monincroyablehistoire.com/admin`

Code par defaut :

`MIH-ADMIN-2026`

## Ce que la personne fait

1. Ouvrir le lien admin.
2. Entrer le code.
3. Modifier les textes, chiffres, images ou liens.
4. Cliquer sur `Apercu`.
5. Cliquer sur `Publier`.

La personne n'a pas besoin de compte GitHub.

## Configuration obligatoire dans Vercel

Pour que le bouton `Publier` fonctionne, ajouter ces variables dans Vercel :

```bash
ADMIN_CODE=MIH-ADMIN-2026
GITHUB_TOKEN=...
GITHUB_OWNER=haziducoin
GITHUB_REPO=mih-media-kit
GITHUB_BRANCH=main
MEDIA_KIT_CONTENT_PATH=src/content/media-kit.json
```

Le token GitHub doit avoir le droit de modifier le repository `haziducoin/mih-media-kit`.

## Fonctionnement

L'editeur appelle `/api/update-media-kit`.

L'API verifie le code, met a jour `src/content/media-kit.json` via GitHub, puis Vercel redeploie automatiquement le site.
