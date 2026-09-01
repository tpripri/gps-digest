# Du dépôt au domaine

## 0. Le nom du dépôt

**`gps-digest`.**

Trois raisons : il correspond déjà au code (`package.json`, les imports, l'en-tête du bundle), il décrit ce que fait l'outil sans l'enfermer dans un format, et **le nom du dépôt n'est pas le nom de la marque**. Le domaine pourra s'appeler autrement — c'est un choix indépendant, et bien plus lourd de conséquences.

Décision à faible enjeu, d'ailleurs : GitHub permet de renommer un dépôt et redirige automatiquement l'ancienne URL. Le domaine, non.

Dans le formulaire ouvert :

| Champ | Valeur |
|---|---|
| Repository name | `gps-digest` |
| Description | Compacte les fichiers de montres GPS (TCX, GPX, FIT) en résumés CSV analysables par un LLM |
| Visibility | **Public** — le code ne contient aucun secret, et l'ouverture sert la crédibilité de la promesse « rien ne sort de votre navigateur » : n'importe qui peut vérifier |
| Add a README | **Non** — il en existe déjà un, et cocher la case crée un conflit au premier push |
| .gitignore / license | **Non** — déjà dans les fichiers |

---

## 1. Pousser le code

Décompressez les fichiers dans un dossier `gps-digest`, puis, depuis ce dossier :

```bash
git init
git add .
git commit -m "Version initiale : bibliothèque de compaction, analyses et site"
git branch -M main
git remote add origin https://github.com/tpripri/gps-digest.git
git push -u origin main
```

Si le push demande un mot de passe : GitHub ne les accepte plus. Créez un jeton dans Settings → Developer settings → Personal access tokens → Fine-grained tokens, avec la permission « Contents: Read and write » sur ce seul dépôt. Le jeton remplace le mot de passe.

**Avant de committer quoi que ce soit d'autre :** le `.gitignore` fourni exclut `*.tcx`, `*.gpx` et `*.fit`. Ce n'est pas de la propreté, c'est de la sécurité — une trace GPS contient votre adresse au mètre près, et un dépôt public la rendrait publique avec.

---

## 2. Tester

### En local

```bash
npm install
npm test          # les deux suites, 68 assertions
npx tsc --noEmit  # vérification des types
```

Les tests génèrent leurs propres fichiers : rien à fournir, rien à télécharger.

### Sur vos vrais fichiers — l'étape qui compte

Les tests utilisent des fichiers synthétiques. Ils prouvent que les algorithmes sont corrects, **pas** qu'ils tiennent face à des fichiers réels, qui sont beaucoup plus sales : capteurs qui décrochent, pauses, tunnels, changements de montre.

```bash
mkdir -p perso   # déjà exclu par .gitignore

cat > perso/essai.ts <<'EOF'
import { readFileSync } from "node:fs";
import { digestFile } from "../src/digest.ts";

const path = process.argv[2];
const { digest, bundle, insights, warnings } = await digestFile(
  path,
  readFileSync(path, "utf8"),
  { athlete: { maxHr: 168 }, streamTokenBudget: 6000, privacyRadiusM: 250 },
);

console.log("Capteur FC :", insights.hrSource.verdict,
            `(confiance ${insights.hrSource.confidence.toFixed(2)})`);
console.log("Verrouillage cadence :", insights.hrSource.cadenceLockPct.toFixed(1), "%");
console.log("Dérive :", insights.drift.applicable
  ? `${insights.drift.decouplingPct?.toFixed(1)} %`
  : `non calculée — ${insights.drift.reason}`);
console.log("Séries :", digest.intervalSets.map((s) => s.description).join(" + ") || "aucune");
console.log("Réduction :", (digest.reduction.ratio * 100).toFixed(1), "%",
            `→ ~${digest.reduction.estimatedTokens} tokens`);
for (const w of warnings) console.log("⚠", w);
EOF

node --experimental-strip-types perso/essai.ts perso/ma-sortie.tcx
```

Quatre choses à vérifier, dans cet ordre :

1. **Le capteur détecté est-il le bon ?** Vous savez quelles séances ont été faites à la ceinture. Si le verdict se trompe, l'heuristique est à recalibrer avant tout le reste — la dérive et les zones en dépendent.
2. **La distance correspond-elle à celle affichée par Garmin Connect ?** Un écart de plus de 1 % signale un problème de parsing ou de rognage.
3. **Les séries détectées correspondent-elles à ce que vous avez réellement fait ?** Le détecteur s'abstient plutôt que d'inventer : « aucune série » sur du fractionné est un échec silencieux à corriger.
4. **Le bundle collé dans Gemini donne-t-il une analyse sensée ?** C'est le seul test qui vaille vraiment.

Testez au minimum : une sortie d'avant août (poignet), une d'après (ceinture), un fractionné, une sortie longue, et un fichier vélo.

---

## 3. Déployer

### Où

Cloudflare a changé sa recommandation : <cite index="90-1">« Maintenant que Workers gère à la fois les fichiers statiques et le rendu côté serveur, commencez par Workers »</cite>, et <cite index="82-1">Pages est désormais en mode maintenance tandis que tous les nouveaux développements vont vers Workers</cite>. Pour un projet neuf en 2026, **Workers avec static assets**.

Ce n'est pas qu'une question de mode : vous aurez besoin de logique côté serveur pour la redirection de `/` selon la langue du navigateur, et pour l'OAuth Strava si vous le branchez. Sur Workers, c'est le même déploiement ; sur Pages, il faut bricoler.

<cite index="83-1">Le trafic n'est jamais facturé sur les fichiers statiques</cite> : pour un outil qui calcule tout côté client, la facture reste à zéro même avec du trafic.

### Configuration

`wrangler.jsonc` est fourni. Une fois le site construit :

```bash
npm install -g wrangler
wrangler login
wrangler deploy
```

Le site est en ligne sur `gps-digest.<votre-sous-domaine>.workers.dev`. Vérifiez tout **là** avant de brancher un domaine.

### Déploiement automatique

Dans le tableau de bord Cloudflare : Workers & Pages → votre Worker → Settings → Builds → connecter le dépôt GitHub. Chaque push sur `main` redéploie.

Faites le build côté Cloudflare plutôt que dans GitHub Actions : <cite index="84-1">GitHub Actions facture à la minute, et enchaîner install, build et déploiement à chaque push finit par coûter cher</cite>. Gardez Actions pour les tests, qui sont légers — c'est ce que fait le workflow fourni.

### Brancher le domaine

1. Achetez le domaine (Cloudflare Registrar le vend au prix coûtant, ce qui évite les renouvellements à 40 €).
2. Ajoutez-le comme site dans Cloudflare et pointez les serveurs DNS du registrar vers ceux que Cloudflare vous donne. Propagation : quelques minutes à 24 h.
3. Worker → Settings → Domains & Routes → Add Custom Domain. Le certificat TLS est émis automatiquement.
4. Décidez `www` ou apex, puis **redirigez l'un vers l'autre en 301**. Servir les deux crée du contenu dupliqué et divise l'autorité.

### Le piège qui annulerait tout le travail GEO

Sur les offres Cloudflare récentes, **le blocage des robots d'IA est activé par défaut**. Vous publieriez un `robots.txt` accueillant tout en renvoyant des 403 aux robots au niveau du CDN — invisible depuis un navigateur.

Après la mise en ligne, vérifiez pour de vrai :

```bash
curl -A "GPTBot" -sI https://votre-domaine.com/ | head -1
curl -A "ClaudeBot" -sI https://votre-domaine.com/ | head -1
curl -A "PerplexityBot" -sI https://votre-domaine.com/ | head -1
```

Trois `HTTP/2 200`, sinon désactivez le blocage dans Security → Bots.

Vérifiez aussi que le contenu est bien servi sans JavaScript, puisque c'est là-dessus que repose toute la stratégie :

```bash
curl -s https://votre-domaine.com/fr/ | grep -c "533 000"
```

### Mise en service

- Google Search Console et Bing Webmaster Tools : ajouter la propriété, soumettre `sitemap-index.xml`.
- Test des résultats enrichis de Google : valider `SoftwareApplication`, `FAQPage`, `HowTo`.
- Vérifier que `/llms.txt` et `/robots.txt` répondent en 200.
- Lighthouse : viser LCP < 2,0 s, CLS < 0,05, INP < 200 ms.

---

## 4. Une décision à prendre maintenant, pas plus tard

Vous parlez de domaines différents par langue. **C'est le contraire de ce que je recommandais**, et le moment de trancher est avant l'achat, pas après.

Le problème n'est pas technique — servir trois domaines depuis un Worker est trivial. Il est que l'autorité ne se cumule pas : trois domaines, c'est trois réputations à construire au lieu d'une, trois fois le travail de netlinking, trois profils Search Console. Les moteurs génératifs raisonnent au niveau du domaine ; en divisant, vous divisez vos chances d'être cité. Et vous ne pouvez pas revenir en arrière sans perdre ce que vous avez accumulé.

Un seul domaine avec `/fr/`, `/en/`, `/es/` donne exactement la même expérience à l'utilisateur — les slugs sont déjà traduits — pour un tiers de l'effort.

Le cas où les domaines séparés se défendent : si vous visez des marques distinctes par marché, ou si vous voulez pouvoir revendre une langue séparément. Si ce n'est pas votre plan, prenez un `.com` et redirigez vers `/fr/` selon `Accept-Language`.

Quoi qu'il en soit, **achetez d'abord un seul domaine**. Vous pourrez toujours en ajouter ; vous ne pourrez pas défaire une autorité éparpillée.
