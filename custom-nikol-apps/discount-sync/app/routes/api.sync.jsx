/**
 * api.sync.jsx — the scheduler endpoint.
 *
 * Discounts activate on a clock (startsAt/endsAt), so something has to
 * check the clock. Point any external cron (Vercel Cron, GitHub Actions,
 * cron-job.org, fly.io machines, etc.) at:
 *
 *   POST https://your-app-host.com/api/sync?secret=YOUR_SYNC_SECRET
 *
 * every 5 minutes. Set SYNC_SECRET in your environment. The endpoint
 * loops over every installed shop, using stored offline tokens.
 */

import { json } from "@remix-run/node";
import prisma from "../db.server";
import { unauthenticated } from "../shopify.server";
import { syncShop } from "../services/sync.server";

export const action = async ({ request }) => {
  const url = new URL(request.url);
  if (url.searchParams.get("secret") !== process.env.SYNC_SECRET) {
    return json({ error: "unauthorized" }, { status: 401 });
  }

  // Every shop that has a tracked discount — plus any shop whose last
  // reconcile left writes on the storefront (state != "{}"), so cleanup
  // still runs after the final discount is untracked or deleted.
  const trackedShops = await prisma.trackedDiscount.findMany({
    distinct: ["shop"],
    select: { shop: true },
  });
  const appliedShops = await prisma.appliedState.findMany({
    where: {
      AND: [
        { NOT: { state: '{"variants":{},"tags":{},"styles":{},"conflicts":[],"ignored":[]}' } },
        { NOT: { state: '{"variants":{},"tags":{},"styles":{},"conflicts":[]}' } },
        { NOT: { state: '{"variants":{},"tags":{},"styles":{}}' } }, // legacy pre-conflicts shape
        { NOT: { state: '{"variants":{},"tags":{}}' } }, // legacy pre-styling shape
      ],
    },
    select: { shop: true },
  });
  const shops = [
    ...new Set([...trackedShops, ...appliedShops].map((s) => s.shop)),
  ].map((shop) => ({ shop }));

  const results = {};
  for (const { shop } of shops) {
    try {
      const { admin } = await unauthenticated.admin(shop);
      results[shop] = await syncShop(admin, shop);
    } catch (error) {
      results[shop] = { error: String(error) };
    }
  }

  return json({ ok: true, results });
};

export const loader = () => json({ error: "POST only" }, { status: 405 });
