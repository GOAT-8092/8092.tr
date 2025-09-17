// Service Worker for FRC Team 8092 Website
const CACHE_NAME = 'goat-8092-v1';
const STATIC_CACHE = 'goat-static-v1';
const IMAGE_CACHE = 'goat-images-v1';
const API_CACHE = 'goat-api-v1';

// URLs to cache on install
const STATIC_CACHE_URLS = [
  '/',
  '/logo-black.svg',
  '/logo-white.svg',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css',
  'https://code.jquery.com/jquery-3.6.0.min.js',
  'https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        return cache.addAll(STATIC_CACHE_URLS);
      })
    ])
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName.startsWith('goat-') && cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache when offline, otherwise cache responses
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip cross-origin requests that aren't in our allowlist
  if (url.origin !== self.location.origin &&
      !url.origin.includes('cdnjs.cloudflare.com') &&
      !url.origin.includes('cdn.jsdelivr.net') &&
      !url.origin.includes('code.jquery.com')) {
    return;
  }

  // Handle different types of requests
  if (event.request.url.includes('/img/')) {
    // Cache images
    event.respondWith(
      caches.open(IMAGE_CACHE).then(cache => {
        return cache.match(event.request).then(response => {
          return response || fetch(event.request).then(fetchResponse => {
            // Cache successful image responses
            if (fetchResponse.status === 200) {
              cache.put(event.request, fetchResponse.clone());
            }
            return fetchResponse;
          });
        });
      })
    );
  } else if (event.request.destination === 'script' || event.request.destination === 'style') {
    // Cache scripts and styles
    event.respondWith(
      caches.open(STATIC_CACHE).then(cache => {
        return cache.match(event.request).then(response => {
          return response || fetch(event.request).then(fetchResponse => {
            if (fetchResponse.status === 200) {
              cache.put(event.request, fetchResponse.clone());
            }
            return fetchResponse;
          });
        });
      })
    );
  } else if (event.request.mode === 'navigate') {
    // Cache HTML pages
    event.respondWith(
      fetch(event.request).then(response => {
        const responseClone = response.clone();
        caches.open(STATIC_CACHE).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(() => {
        return caches.match(event.request);
      })
    );
  } else {
    // For other requests, try cache first, then network
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});

// Background sync for when connectivity is restored
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Sync any pending analytics or updates
      Promise.resolve()
    );
  }
});

// Push notification support (if needed later)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/logo-black.svg',
      badge: '/logo-black.svg'
    });
  }
});