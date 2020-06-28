const {
	assets
} = global.serviceWorkerOption;

const CACHE_NAME = "wikifootbal-v1";
let assetsToCache = [...assets, "./"];

assetsToCache = assetsToCache.map((path) => {
	return new URL(path, global.location).toString();
});

self.addEventListener("install", event => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => {
			return cache.addAll(assetsToCache);
		})
		.catch((error) => {
			console.error(error);
		})
	);
});

self.addEventListener("fetch", event => {
	const base_url = "http://api.football-data.org/v2/";

	if (event.request.url.indexOf(base_url) > -1) {
		event.respondWith(
			caches.open(CACHE_NAME).then((cache) => {
				return fetch(event.request).then((response) => {
					cache.put(event.request.url, response.clone());
					return response;
				});
			})
		);
	} else {
		event.respondWith(
			caches.match(event.request, {
				ignoreSearch: true,
			})
			.then((response) => {
				return response || fetch(event.request);
			})
		);
	}
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== CACHE_NAME) {
						console.log("SW: cache " + cacheName + " deleted.");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener("message", (event) => {
	switch (event.data.action) {
		case "skipWaiting":
			if (self.skipWaiting) {
				self.skipWaiting();
				self.clients.claim();
			}
			break;
		default:
			break;
	}
});

self.addEventListener('push', event => {
	let body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}
	var options = {
		body: body,
		icon: './assets/icon/icon.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};
	event.waitUntil(
		self.registration.showNotification('Push Notification', options)
	);
});