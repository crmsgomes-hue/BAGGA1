self.addEventListener('push', function(event) {
  let data = { title: 'CoreJoint', body: 'Tens pendências por verificar.' };
  try { data = event.data.json(); } catch (e) {}
  event.waitUntil(
    self.registration.showNotification(data.title || 'CoreJoint', {
      body: data.body || '',
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      requireInteraction: true,
      vibrate: [200, 100, 200, 100, 200],
      tag: 'cj-pendencias',
      renotify: true
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://crmsgomes-hue.github.io/BAGGA1/CoreJoint_Reportes.html?gestao=1')
  );
});
