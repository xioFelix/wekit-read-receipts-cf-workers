import worker from "./index.js";

const WEKIT_HEALTH_CHECK_WXID = "wekit-health-check";
const WEKIT_HEALTH_CHECK_ID = "0".repeat(64);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (
      request.method === "GET" &&
      url.pathname === "/count" &&
      url.searchParams.get("wxId") === WEKIT_HEALTH_CHECK_WXID &&
      url.searchParams.get("id") === WEKIT_HEALTH_CHECK_ID
    ) {
      return new Response(JSON.stringify({ count: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    }

    return worker.fetch(request, env, ctx);
  },

  async scheduled(event, env, ctx) {
    return worker.scheduled(event, env, ctx);
  },
};
