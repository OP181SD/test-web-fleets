# Flottes

Next.js 16 · Prisma + PostgreSQL · React Hook Form + Zod · TanStack Query · Intlayer

## Prérequis

- [Bun](https://bun.sh)
- PostgreSQL 16+ — via Docker, ou installé en local (voir option B)

## Option A — avec Docker (le plus rapide)

```bash
cp .env.example .env
docker compose up -d          # Postgres sur le port 5432
bun install
bunx prisma migrate deploy
bun run db:seed               # 40 flottes de démonstration
bun run dev
```

L'URL de connexion est déjà renseignée dans `.env.example`, rien à modifier.

## Option B — sans Docker

Installer PostgreSQL :

- **macOS** : `brew install postgresql@17 && brew services start postgresql@17`
- **Debian / Ubuntu** : `sudo apt install postgresql`
- **Windows** : installeur officiel sur [postgresql.org](https://www.postgresql.org/download/windows/)

Puis créer la base et le `.env` :

```bash
createdb fleets
cp .env.example .env
```

Dans `.env`, remplacer `DATABASE_URL` par **votre utilisateur système** :

```
DATABASE_URL="postgresql://VOTRE_USER@localhost:5432/fleets"
```

> **Pourquoi votre utilisateur système ?** Une installation locale de PostgreSQL
> (Homebrew, apt…) crée automatiquement un rôle superutilisateur portant le nom de
> votre compte OS, **sans mot de passe** (authentification locale « trust »). C'est ce
> rôle qui possède la base après `createdb`. On se connecte donc avec ce nom, sans mot
> de passe — contrairement à Docker qui, lui, crée le rôle dédié `fleets` / `fleets`.
>
> Exemple : si `whoami` affiche `yassine`, la ligne devient
> `DATABASE_URL="postgresql://yassine@localhost:5432/fleets"`.

Ensuite, mêmes commandes que ci-dessus :

```bash
bun install
bunx prisma migrate deploy
bun run db:seed
bun run dev
```

## Accès

- http://localhost:3000/fleets — français par défaut
- http://localhost:3000/fr/fleets
- http://localhost:3000/en/fleets

Les trois URL répondent en 200, sans redirection.
