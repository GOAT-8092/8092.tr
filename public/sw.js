// Advanced Service Worker for FRC Team 8092 Website
const CACHE_VERSION = '3.0.0';
const CACHE_NAME = `goat-8092-v${CACHE_VERSION}`;
const STATIC_CACHE = `goat-static-v${CACHE_VERSION}`;
const IMAGE_CACHE = `goat-images-v${CACHE_VERSION}`;
const API_CACHE = `goat-api-v${CACHE_VERSION}`;
const FONT_CACHE = `goat-fonts-v${CACHE_VERSION}`;
const RUNTIME_CACHE = `goat-runtime-v${CACHE_VERSION}`;

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  CACHE_ONLY: 'cache-only',
  NETWORK_ONLY: 'network-only',
};

// Cache duration in milliseconds
const CACHE_DURATION = {
  STATIC: 24 * 60 * 60 * 1000, // 24 hours
  IMAGES: 7 * 24 * 60 * 60 * 1000, // 7 days
  FONTS: 30 * 24 * 60 * 60 * 1000, // 30 days
  API: 5 * 60 * 1000, // 5 minutes
  RUNTIME: 60 * 60 * 1000, // 1 hour
};

// Cache size limits
const CACHE_LIMITS = {
  IMAGES: 50 * 1024 * 1024, // 50MB
  RUNTIME: 10 * 1024 * 1024, // 10MB
  API: 5 * 1024 * 1024, // 5MB
};

// URLs to cache on install for offline support
const STATIC_CACHE_URLS = [
  '/',
  '/logo-black.svg',
  '/logo-white.svg',
  '/manifest.json',
  '/F_D_Renk_Simge_Beyaz_Metin.png',
  '/FIRST_Vertical_RGB_reverse.png',
  '/fonts/*',
  '/styles/*',
];

// External resources to cache
const EXTERNAL_CACHE_URLS = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css',
  'https://code.jquery.com/jquery-3.6.0.min.js',
  'https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js',
  'https://fonts.gstatic.com/s/atkinsonhyperlegible/v15',
];

// API endpoints that benefit from caching
const CACHEABLE_API_ENDPOINTS = ['/api/search', '/api/stats', '/api/content'];

// Install event - cache static resources
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    Promise.all([
      // Cache static resources
      caches.open(STATIC_CACHE).then(cache => {
        console.log('[SW] Caching static resources');
        return cache.addAll(STATIC_CACHE_URLS);
      }),
      // Cache external resources
      caches.open(FONT_CACHE).then(cache => {
        console.log('[SW] Caching external fonts');
        return cache.addAll(EXTERNAL_CACHE_URLS.filter(url => url.includes('font')));
      }),
      // Skip waiting to activate new service worker immediately
      self.skipWaiting(),
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => !cacheName.includes(CACHE_VERSION))
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      // Take control of all open clients
      self.clients.claim(),
    ])
  );
});

// Fetch event with advanced caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // Determine cache strategy based on request type
  const strategy = getCacheStrategy(request, url);

  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      event.respondWith(cacheFirst(request));
      break;
    case CACHE_STRATEGIES.NETWORK_FIRST:
      event.respondWith(networkFirst(request));
      break;
    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      event.respondWith(staleWhileRevalidate(request));
      break;
    case CACHE_STRATEGIES.CACHE_ONLY:
      event.respondWith(cacheOnly(request));
      break;
    default:
      event.respondWith(networkOnly(request));
  }
});

// Determine cache strategy based on request type
function getCacheStrategy(request, url) {
  // Static assets - Cache First
  if (request.url.match(/\.(css|js|svg|png|jpg|jpeg|gif|webp|avif|ico)$/)) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }

  // Images - Cache First with longer duration
  if (request.url.match(/\.(jpg|jpeg|png|gif|webp|avif)$/)) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }

  // Fonts - Cache Only (long term)
  if (request.url.includes('font') || request.url.match(/\.(woff|woff2|ttf|otf)$/)) {
    return CACHE_STRATEGIES.CACHE_ONLY;
  }

  // API endpoints - Network First with cache fallback
  if (CACHEABLE_API_ENDPOINTS.some(endpoint => url.pathname.startsWith(endpoint))) {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }

  // External CDN resources - Cache First
  if (
    url.hostname.includes('cdnjs.cloudflare.com') ||
    url.hostname.includes('cdn.jsdelivr.net') ||
    url.hostname.includes('fonts.gstatic.com')
  ) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }

  // HTML pages - Stale While Revalidate
  if (request.headers.get('accept')?.includes('text/html')) {
    return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
  }

  // Default: Network First
  return CACHE_STRATEGIES.NETWORK_FIRST;
}

// Cache First Strategy
async function cacheFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);

  if (cached) {
    // Check if cached response is still valid
    const date = new Date(cached.headers.get('date') || Date.now());
    const age = Date.now() - date.getTime();

    if (age < CACHE_DURATION.RUNTIME) {
      return cached;
    }
  }

  try {
    const network = await fetch(request);
    if (network.ok) {
      await cache.put(request, network.clone());
      await enforceCacheLimit(RUNTIME_CACHE, CACHE_LIMITS.RUNTIME);
    }
    return network;
  } catch (error) {
    console.log('[SW] Network request failed, returning cached response:', error);
    return cached || new Response('Offline', { status: 503 });
  }
}

// Network First Strategy
async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const network = await fetch(request);
    if (network.ok) {
      await cache.put(request, network.clone());
      await enforceCacheLimit(RUNTIME_CACHE, CACHE_LIMITS.RUNTIME);
    }
    return network;
  } catch (error) {
    console.log('[SW] Network request failed, trying cache:', error);
    const cached = await cache.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);

  // Always fetch from network in background
  const fetchPromise = fetch(request)
    .then(async network => {
      if (network.ok) {
        await cache.put(request, network.clone());
        await enforceCacheLimit(RUNTIME_CACHE, CACHE_LIMITS.RUNTIME);
      }
      return network;
    })
    .catch(error => {
      console.log('[SW] Background fetch failed:', error);
    });

  // Return cached response immediately if available
  if (cached) {
    return cached;
  }

  // Otherwise wait for network
  return fetchPromise;
}

// Cache Only Strategy
async function cacheOnly(request) {
  const cache = await caches.open(request.url.includes('font') ? FONT_CACHE : IMAGE_CACHE);
  const cached = await cache.match(request);
  return cached || new Response('Not found', { status: 404 });
}

// Network Only Strategy
async function networkOnly(request) {
  try {
    return await fetch(request);
  } catch (error) {
    console.log('[SW] Network request failed:', error);
    return new Response('Network error', { status: 503 });
  }
}

// Enforce cache size limits
async function enforceCacheLimit(cacheName, maxSize) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  if (keys.length === 0) return;

  let totalSize = 0;
  const items = [];

  for (const request of keys) {
    const response = await cache.match(request);
    const blob = await response.blob();
    totalSize += blob.size;
    items.push({ request, size: blob.size });
  }

  if (totalSize > maxSize) {
    // Sort by size (largest first) and remove until under limit
    items.sort((a, b) => b.size - a.size);

    for (const item of items) {
      await cache.delete(item.request);
      totalSize -= item.size;

      if (totalSize <= maxSize * 0.8) {
        // Remove until 80% of limit
        break;
      }
    }
  }
}

// Background sync for offline functionality
self.addEventListener('sync', event => {
  console.log('[SW] Background sync triggered:', event.tag);

  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync operations
      syncOfflineData()
    );
  }
});

// Handle offline data sync
async function syncOfflineData() {
  // Get all offline data from IndexedDB
  // Sync with server when online
  console.log('[SW] Syncing offline data...');

  // Implementation would depend on your offline storage strategy
  return Promise.resolve();
}

// Push notifications (if needed)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    console.log('[SW] Push notification received:', data);

    const options = {
      body: data.body,
      icon: '/logo-black.svg',
      badge: '/logo-white.svg',
      vibrate: [100, 50, 100],
      data: {
        url: data.url || '/',
      },
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification clicked');

  event.notification.close();

  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});

// Message handling from clients
self.addEventListener('message', event => {
  console.log('[SW] Message received:', event.data);

  switch (event.data.type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
    case 'CACHE_URLS':
      event.waitUntil(cacheUrls(event.data.urls));
      break;
    case 'CLEAR_CACHE':
      event.waitUntil(clearAllCaches());
      break;
  }
});

// Cache specific URLs
async function cacheUrls(urls) {
  const cache = await caches.open(RUNTIME_CACHE);
  await cache.addAll(urls);
  console.log('[SW] Cached URLs:', urls);
}

// Clear all caches
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
  console.log('[SW] All caches cleared');
}

console.log('[SW] Service Worker loaded');
