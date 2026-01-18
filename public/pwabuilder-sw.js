/* eslint-disable no-restricted-globals */
// NUCLEAR KILL SWITCH SW: delete all caches + unregister itself + force reload
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    try {
      // 1) delete ALL caches on this origin
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));

      // 2) unregister this SW
      await self.registration.unregister();

      // 3) reload all open tabs (best effort)
      const clientsArr = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      for (const client of clientsArr) {
        // navigate forces network request for the document
        try { await client.navigate(client.url); } catch {}
      }
    } catch (e) {
      // ignore
    }
  })());
});

// do not intercept fetch (avoid recreating cache)
self.addEventListener("fetch", () => {});