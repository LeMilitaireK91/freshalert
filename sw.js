// FreshAlert — service worker : réception des notifications
self.addEventListener("push", e => {
  let d = {};
  try { d = e.data.json(); } catch (_) {}
  e.waitUntil(self.registration.showNotification(d.title || "FreshAlert", {
    body: d.body || "", tag: d.tag, icon: "icon-180.png", data: { url: d.url || "./" }
  }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(l => {
    for (const c of l) if ("focus" in c) return c.focus();
    return clients.openWindow((e.notification.data && e.notification.data.url) || "./");
  }));
});
