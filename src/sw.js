import 'regenerator-runtime';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing/registerRoute';
import { skipWaiting, clientsClaim } from 'workbox-core';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST, {
  ignoreURLParametersMatching: [/.*/],
});

registerRoute(
  /^https:\/\/api\.football-data\.org/,
  new StaleWhileRevalidate({
    cacheName: 'api-football',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24,
        maxEntries: 10,
      }),
    ],
  })
);

self.addEventListener('push', event => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Hello from WikiFootball.';
  }
  var options = {
    body: body,
    icon: './assets/icon/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(self.registration.showNotification('Push Notification', options));
});
