# Intégration Strava

## Ce que le MCP fournit

`get_activity_streams` expose exactement les canaux dont le pipeline a besoin :
`time`, `distance`, `heart_rate`, `cadence`, `watts`, `altitude`, `velocity_smooth`, `grade_smooth`, `temp`, `moving`, `location`. La correspondance avec le type `Sample` est directe — l'adaptateur (`src/strava.ts`) tient en quarante lignes et **tout le reste du traitement est partagé** avec les fichiers déposés à la main. Aucune analyse n'est à réécrire.

Trois outils suffisent :

| Outil | Rôle | Coût |
|---|---|---|
| `list_activities` | Lister sur une plage de dates | 1 appel |
| `get_activity_performance` | Tours, FC moyenne/max, drapeau `has_heartrate` | 1 appel / activité |
| `get_activity_streams` | Le flux complet | 1 appel / activité |

## Séquence, et pourquoi elle est en deux temps

```
list_activities(range_start, range_end)   ← 1 appel, l'utilisateur choisit
        ↓  sélection dans l'interface
pour chaque activité retenue :
  get_activity_performance(id)            ← tours et métadonnées
  get_activity_streams(id, [canaux])      ← flux
        ↓
fromStravaStreams(meta, streams)  →  buildFull()  →  même pipeline
```

**Ne jamais tirer les flux de toutes les activités d'un coup.** Vingt activités = quarante appels. L'API Strava applique des limites par tranche de 15 minutes et par jour ; les dépasser fait tomber l'intégration pour tous les utilisateurs, pas seulement celui qui a cliqué. La sélection explicite n'est donc pas seulement une bonne UX, c'est une protection.

Prévoir : file d'attente séquentielle, une barre de progression honnête (« 7 sur 20 »), reprise après erreur sans repartir de zéro, et un cache local des activités déjà importées.

## Trois réserves à afficher, pas à enterrer

**Le lissage serveur dégrade la détection de capteur.** Strava lisse ses flux. Les micro-variations qui distinguent une ceinture d'un capteur optique sont en partie effacées : la détection reste utile mais moins sûre qu'à partir d'un FIT d'origine. L'interface doit le dire — c'est `STRAVA_SENSOR_CAVEAT` dans le code. Quand l'utilisateur a les deux, préférer le fichier brut.

**Strava ne rend pas la structure de séance.** Les blocs prescrits (workout steps) présents dans un FIT Garmin n'existent pas dans l'API. L'analyse d'adhérence retombe sur la détection automatique et sur les tours. C'est suffisant quand l'athlète appuie sur le bouton à chaque répétition, nettement moins sinon.

**La position peut être masquée.** Zones de confidentialité, activités privées : `location` peut être absente ou tronquée. Le code recalcule alors la distance depuis le canal `distance`, mais le profil altimétrique et le GAP deviennent partiels.

## À vérifier avant de publier

Trois points qui relèvent du juridique, pas de la technique, et qui ont fait fermer des applications :

- **Conditions d'utilisation de l'API Strava** : restrictives sur le stockage et l'affichage des données dérivées. Le modèle « rien ne quitte le navigateur » aide beaucoup ici, mais lis-les.
- **Mention obligatoire** « Powered by Strava », avec les contraintes de marque associées.
- **Quotas** : demander un relèvement avant, pas après le premier pic de trafic.

## Une question de cohérence produit

L'argument central du site est que rien ne part sur un serveur. Une intégration OAuth introduit forcément un aller-retour serveur pour l'échange de jetons.

Deux options, à trancher explicitement :

1. **PKCE côté client, jeton en mémoire de session.** Reste fidèle à la promesse, oblige à se reconnecter à chaque session. Techniquement plus contraignant.
2. **Backend minimal pour OAuth uniquement**, les flux transitant sans jamais être stockés.

L'option 2 est plus simple à construire. Mais elle change la phrase que tu peux écrire sur la page d'accueil, et cette phrase est ton meilleur argument face aux concurrents. Si tu la retiens, la page confidentialité doit distinguer clairement les deux chemins — dépôt de fichier et import Strava — au lieu de laisser croire à une promesse uniforme.
