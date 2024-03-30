import Fastify from "fastify";
import FastifyVite from "@fastify/vite";
import FastifyFormBody from "@fastify/formbody";

const server = Fastify({
  logger: {
    transport: {
      target: "@fastify/one-line-logger",
    },
  },
});

await server.register(FastifyFormBody);
await server.register(FastifyVite, {
  root: import.meta.url,
  createRoute({ handler, errorHandler, route }, fastify, config) {
    fastify.route({
      url: route.path,
      method: route.method ?? "GET",
      async handler(req, reply) {
        reply.type("text/html");
        reply.html({
          element: await route.default({ fastify, req, reply }),
        });
      },
      errorHandler,
      ...route,
    });
  },
});

await server.vite.ready();
await server.listen({ port: 3000 });
