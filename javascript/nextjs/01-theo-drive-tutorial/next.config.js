/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  // going to manually do this in CI, so it doesn't block the deploy
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // ref: https://posthog.com/docs/advanced/proxy/nextjs
  async rewrites() {
    return [
      {
        source: "/relay-Dh75/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/relay-Dh75/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/relay-Dh75/flags",
        destination: "https://us.i.posthog.com/flags",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default config;
