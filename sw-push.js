self.addEventListener('push', function(event) {
  let data = { title: 'CoreJoint', body: 'Tens pendências por verificar.' };
  try { data = event.data.json(); } catch (e) {}
  event.waitUntil(
    self.registration.showNotification(data.title || 'CoreJoint', {
      body: data.body || '',
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      data: { url: data.url || 'https://crmsgomes-hue.github.io/BAGGA1/CoreJoint_Reportes.html' }
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || 'https://crmsgomes-hue.github.io/BAGGA1/CoreJoint_Reportes.html';
  event.waitUntil(
    clients.openWindow(url)
  );
});
