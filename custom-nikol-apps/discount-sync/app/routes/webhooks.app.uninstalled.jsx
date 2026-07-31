import { authenticate } from "../shopify.server";
import db from "../db.server";

export const action = async ({ request }) => {
  const { shop, session, topic } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);

  // Webhook requests can trigger multiple times and after an app has already been uninstalled.
  // If this webhook already ran, the session may have been deleted previously.
  if (session) {
    await db.session.deleteMany({ where: { shop } });
  }

  // API access is already revoked at this point, so the storefront can't be
  // cleaned from here — that's what the admin UI's "Clear everything" button
  // is for, BEFORE uninstalling. Here we can only purge our own records.
  await db.trackedDiscount.deleteMany({ where: { shop } });
  await db.appliedState.deleteMany({ where: { shop } });

  return new Response();
};
