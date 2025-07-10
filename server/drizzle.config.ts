import { defineConfig } from "drizzle-kit";

import { getConfig } from "config/config.module";

const cfg = getConfig();

export default defineConfig({
    out: "./drizzle",
    schema: "./src/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: cfg.databaseURI,
    },
});
