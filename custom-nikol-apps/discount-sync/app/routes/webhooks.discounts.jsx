/**
 * webhooks.discounts.jsx — reacts instantly when a merchant creates,
 * edits, or deletes a discount in the Shopify admin, so metafields
 * never drift from the real discount configuration.
 *
 * Subscribe these topics to this route in shopify.app.toml:
 *   discounts/create, discounts/update, discounts/delete
 */

import { authenticate, unauthenticated } from "../shopify.server";
import { syncShop } from "../services/sync.server";

export const action = async ({ request }) => {
  const { shop, topic } = await authenticate.webhook(request);
  console.log(`Webhook ${topic} received for ${shop}`);

  try {
    const { admin } = await unauthenticated.admin(shop);
    await syncShop(admin, shop);
  } catch (error) {
    console.error(`Sync after ${topic} failed for ${shop}:`, error);
  }

  return new Response();
};
