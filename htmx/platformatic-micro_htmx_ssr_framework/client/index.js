export const routes = Object.values(
  import.meta.glob("/view/**/*.js", { eager: true })
);
