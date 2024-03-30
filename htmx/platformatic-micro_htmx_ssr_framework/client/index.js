export const routes = Object.values(
  // automatically imports and makes it available to Fastify
  import.meta.glob("/view/**/*.js", { eager: true })
);
