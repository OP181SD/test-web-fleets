import { defineConfig } from "prisma/config";

try {
  process.loadEnvFile();
} catch {
  // Pas de .env : normal sur un clone frais ou en CI.
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations", seed: "bun prisma/seed.ts" },
  datasource: { url: process.env.DATABASE_URL ?? "" },
});
