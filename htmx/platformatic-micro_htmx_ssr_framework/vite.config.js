import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  // following @fastify/vite's convention of keeping client source files in a client/ folder.
  root: join(dirname(fileURLToPath(import.meta.url)), "client"),
});
