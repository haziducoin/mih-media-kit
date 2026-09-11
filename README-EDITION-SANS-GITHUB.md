# Edition du kit media sans compte GitHub

## Lien a envoyer

`https://partenaires.monincroyablehistoire.com/admin`

Code par defaut :

`MIH-ADMIN-2026`

## Ce que la personne fait

1. Ouvrir le lien admin.
2. Entrer le code.
3. Modifier les textes, chiffres, images ou liens.
4. Verifier le rendu dans l'apercu live a droite.
5. Cliquer sur `Publier`.

La personne n'a pas besoin de compte GitHub.

## Envoyer a Claude, Codex ou une autre IA

Le plus simple est d'envoyer a l'IA :

```text
Tu dois modifier le kit media MON INCROYABLE HISTOIRE directement depuis son admin, sans utiliser GitHub ni Vercel.

URL admin : https://partenaires.monincroyablehistoire.com/admin
Code admin : [COLLER LE CODE ICI]
URL publique : https://partenaires.monincroyablehistoire.com/

Methode simple avec navigateur :
1. Ouvre l'URL admin.
2. Entre le code admin.
3. Modifie uniquement les champs demandes.
4. Utilise l'apercu live a droite pour verifier le rendu.
5. Pour une image, depose directement le fichier dans le champ image/logo/avatar concerne.
6. Clique sur Publier en ligne quand le rendu est valide.

Methode API si tu peux faire des requetes HTTP :
1. Lire le contenu actuel : POST https://partenaires.monincroyablehistoire.com/api/media-kit-content avec JSON {"code":"[CODE]"}
2. Publier : POST https://partenaires.monincroyablehistoire.com/api/update-media-kit avec JSON {"code":"[CODE]","content": contenu_modifie}

Regles importantes :
- Garde exactement la structure JSON existante.
- Ne supprime pas de sections sauf demande explicite.
- Ne modifie que le contenu demande : textes, chiffres, liens, images.
- Les images peuvent etre des chemins /media/... ou des data:image/...; le site les publiera automatiquement.
- Apres publication, attends 1 a 2 minutes puis verifie l'URL publique.
```

Dans l'admin, le bouton `Copier prompt IA` genere automatiquement ce message avec le code deja saisi.

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

Pour les IA, `/api/media-kit-content` permet de lire le contenu actuel avec le meme code admin.
