import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/d604e9599489307e28c9683dd9e99358ce06faa91767a798965fe432dad2380f.sqlite"
  },
});
