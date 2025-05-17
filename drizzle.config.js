const { defineConfig } = require("drizzle-kit");

module.exports = defineConfig({
  out: "./drizzle",
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_0ErpFhQwAL6R@ep-black-snow-a87ldpl3-pooler.eastus2.azure.neon.tech/ai-interview-mocker?sslmode=require',
  },
});
