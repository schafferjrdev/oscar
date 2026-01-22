/* eslint-disable no-restricted-globals */
// Better SW for SPA: network-first for HTML, cache for assets
const VERSION = "v8"; // <-- incremente a cada deploy importante
const CACHE = `oscars-${VERSION}`;

self.addEventListener("install", (event) => {
  self.skipWaiting();
  // não precisa precachear index.html aqui
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    // limpa caches antigos
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (k !== CACHE ? caches.delete(k) : null)));

    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // ✅ 1) Network-first para navegação/HTML (SPA)
  // isso impede ficar preso em index.html velho
  if (req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html")) {
    event.respondWith(networkFirst(req));
    return;
  }

  // ✅ 2) Não cachear Firebase / APIs externas (evita dados fantasmas)
  const isApi =
    url.hostname.includes("firebaseio.com") ||
    url.hostname.includes("googleapis.com") ||
    url.hostname.includes("omdbapi.com") ||
    url.hostname.includes("themoviedb.org") ||
    url.pathname.includes("/__/");

  if (isApi) {
    event.respondWith(fetch(req));
    return;
  }

  // ✅ 3) Assets (js/css/img/fonts): cache-first com atualização em background
  event.respondWith(staleWhileRevalidate(req));
});

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const fresh = await fetch(req, { cache: "no-store" });
    cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached || Response.error();
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(req);

  const fetchPromise = fetch(req)
    .then((fresh) => {
      cache.put(req, fresh.clone());
      return fresh;
    })
    .catch(() => null);

  return cached || fetchPromise || Response.error();
}