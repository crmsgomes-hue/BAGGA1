// CoreJoint — Service Worker
//
// Propósito ÚNICO: permitir "Adicionar ao ecrã principal" (PWA instalável).
// NÃO faz cache de nada — nem HTML, nem CSS, nem JS, nem pedidos ao Supabase.
// Isto significa: a app NUNCA mostra uma versão antiga/desatualizada e
// NUNCA funciona sem ligação à internet (intencional — ver pedido do utilizador).
//
// Não adicionar caches.open / caches.put / caches.match aqui sem
// confirmar com o utilizador — é o que causa o "cache zombie".

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Network-only: vai sempre à rede. Se falhar, devolve uma resposta
  // simples de "offline" em vez de deixar o browser mostrar o erro nativo.
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response(
        'Sem ligação à internet. Verifica a tua ligação e tenta novamente.',
        {
          status: 503,
          statusText: 'Offline',
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        }
      );
    })
  );
});
