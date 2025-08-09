import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    SINGLESTORE_USER: z.string(),
    SINGLESTORE_PASS: z.string(),
    SINGLESTORE_HOST: z.string(),
    SINGLESTORE_PORT: z.string(),
    SINGLESTORE_DB_NAME: z.string(),

    // Clerk server-side variables
    CLERK_SECRET_KEY: z.string().min(1),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    // NEXT_PUBLIC_POSTHOG_KEY: z.string(),

    // Clerk client-side variables
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),

    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    SINGLESTORE_USER: process.env.SINGLESTORE_USER,
    SINGLESTORE_PASS: process.env.SINGLESTORE_PASS,
    SINGLESTORE_HOST: process.env.SINGLESTORE_HOST,
    SINGLESTORE_PORT: process.env.SINGLESTORE_PORT,
    SINGLESTORE_DB_NAME: process.env.SINGLESTORE_DB_NAME,

    // Clerk environment variables
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,

    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
