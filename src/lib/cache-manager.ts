export class CacheManager {
  private static instance: CacheManager;
  private isSupported: boolean;

  private constructor() {
    this.isSupported = 'serviceWorker' in navigator && 'caches' in window;
  }

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  // Check if caching is supported
  isCacheSupported(): boolean {
    return this.isSupported;
  }

  // Get cache size information
  async getCacheInfo(): Promise<{
    totalSize: number;
    caches: Array<{ name: string; size: number; entries: number }>;
  }> {
    if (!this.isSupported) {
      return { totalSize: 0, caches: [] };
    }

    try {
      const cacheNames = await (window as any).caches.keys();
      const cacheInfo = await Promise.all(
        cacheNames.map(async (name: string) => {
          const cache = await (window as any).caches.open(name);
          const requests = await cache.keys();
          let totalSize = 0;

          for (const request of requests) {
            const response = await cache.match(request);
            if (response) {
              const blob = await response.blob();
              totalSize += blob.size;
            }
          }

          return {
            name,
            size: totalSize,
            entries: requests.length,
          };
        })
      );

      const totalSize = cacheInfo.reduce((sum, cache) => sum + cache.size, 0);

      return { totalSize, caches: cacheInfo };
    } catch (error) {
      console.error('Error getting cache info:', error);
      return { totalSize: 0, caches: [] };
    }
  }

  // Clear specific cache
  async clearCache(cacheName: string): Promise<boolean> {
    if (!this.isSupported) return false;

    try {
      await (window as any).caches.delete(cacheName);
      console.log(`[CacheManager] Cleared cache: ${cacheName}`);
      return true;
    } catch (error) {
      console.error(`Error clearing cache ${cacheName}:`, error);
      return false;
    }
  }

  // Clear all caches
  async clearAllCaches(): Promise<boolean> {
    if (!this.isSupported) return false;

    try {
      const cacheNames = await (window as any).caches.keys();
      await Promise.all(cacheNames.map((name: string) => caches.delete(name)));
      console.log('[CacheManager] Cleared all caches');
      return true;
    } catch (error) {
      console.error('Error clearing all caches:', error);
      return false;
    }
  }

  // Preload specific URLs
  async preloadUrls(urls: string[]): Promise<void> {
    if (!this.isSupported) return;

    try {
      const cache = await caches.open('runtime-cache');
      await cache.addAll(urls);
      console.log(`[CacheManager] Preloaded ${urls.length} URLs`);
    } catch (error) {
      console.error('Error preloading URLs:', error);
    }
  }

  // Cache specific URL with custom TTL
  async cacheUrl(url: string, ttl: number = 3600000): Promise<void> {
    if (!this.isSupported) return;

    try {
      const cache = await caches.open('runtime-cache');
      const response = await fetch(url);
      if (response.ok) {
        const headers = new Headers(response.headers);
        headers.set('cache-control', `max-age=${Math.floor(ttl / 1000)}`);
        headers.set('date', new Date().toUTCString());

        const cachedResponse = new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        });

        await cache.put(url, cachedResponse);
        console.log(`[CacheManager] Cached URL: ${url}`);
      }
    } catch (error) {
      console.error(`Error caching URL ${url}:`, error);
    }
  }

  // Get cached response
  async getCachedResponse(url: string): Promise<Response | null> {
    if (!this.isSupported) return null;

    try {
      const cache = await caches.open('runtime-cache');
      const cached = await cache.match(url);

      if (cached) {
        // Check if cached response is still valid
        const date = new Date(cached.headers.get('date') || Date.now());
        const age = Date.now() - date.getTime();
        const maxAge = parseInt(
          cached.headers.get('cache-control')?.split('max-age=')[1] || '3600'
        );

        if (age < maxAge * 1000) {
          return cached;
        } else {
          await cache.delete(url);
        }
      }

      return null;
    } catch (error) {
      console.error(`Error getting cached response for ${url}:`, error);
      return null;
    }
  }

  // Force refresh specific URL
  async forceRefresh(url: string): Promise<void> {
    if (!this.isSupported) return;

    try {
      const cache = await caches.open('runtime-cache');
      await cache.delete(url);
      await this.cacheUrl(url);
      console.log(`[CacheManager] Force refreshed URL: ${url}`);
    } catch (error) {
      console.error(`Error force refreshing ${url}:`, error);
    }
  }

  // Register service worker
  async registerServiceWorker(swPath: string = '/sw.js'): Promise<boolean> {
    if (!this.isSupported) return false;

    try {
      const registration = await navigator.serviceWorker.register(swPath);
      console.log('[CacheManager] Service worker registered:', registration);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.addEventListener('statechange', () => {
            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker is available
              this.notifyUpdate();
            }
          });
        }
      });

      return true;
    } catch (error) {
      console.error('Error registering service worker:', error);
      return false;
    }
  }

  // Unregister service worker
  async unregisterServiceWorker(): Promise<boolean> {
    if (!this.isSupported) return false;

    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
      console.log('[CacheManager] Service worker unregistered');
      return true;
    } catch (error) {
      console.error('Error unregistering service worker:', error);
      return false;
    }
  }

  // Check for service worker updates
  async checkForUpdates(): Promise<boolean> {
    if (!this.isSupported) return false;

    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.update();
      console.log('[CacheManager] Checked for service worker updates');
      return true;
    } catch (error) {
      console.error('Error checking for updates:', error);
      return false;
    }
  }

  // Notify about available update
  private notifyUpdate(): void {
    console.log('[CacheManager] Update available');
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('sw-update-available'));
  }

  // Send message to service worker
  async sendMessageToSW(message: any): Promise<any> {
    if (!this.isSupported) return null;

    try {
      const registration = await navigator.serviceWorker.ready;
      const worker = registration.active;

      if (worker) {
        return new Promise(resolve => {
          const messageChannel = new MessageChannel();
          messageChannel.port1.onmessage = event => resolve(event.data);
          worker.postMessage(message, [messageChannel.port2]);
        });
      }
    } catch (error) {
      console.error('Error sending message to service worker:', error);
    }
    return null;
  }

  // Get offline capabilities
  getOfflineCapabilities(): {
    isSupported: boolean;
    isOnline: boolean;
    hasServiceWorker: boolean;
    cachesCount: number;
  } {
    return {
      isSupported: this.isSupported,
      isOnline: navigator.onLine,
      hasServiceWorker: 'serviceWorker' in navigator,
      cachesCount: 0, // Would need async call to get actual count
    };
  }

  // Setup network status monitoring
  setupNetworkMonitoring(): void {
    window.addEventListener('online', () => {
      console.log('[CacheManager] Network online');
      window.dispatchEvent(new CustomEvent('network-status-changed', { detail: { online: true } }));
    });

    window.addEventListener('offline', () => {
      console.log('[CacheManager] Network offline');
      window.dispatchEvent(
        new CustomEvent('network-status-changed', { detail: { online: false } })
      );
    });
  }

  // Estimate storage usage
  async estimateStorage(): Promise<{
    used: number;
    available: number;
    total: number;
    usagePercentage: number;
  }> {
    if (!navigator.storage?.estimate) {
      return { used: 0, available: 0, total: 0, usagePercentage: 0 };
    }

    try {
      const estimate = await navigator.storage.estimate();
      const used = estimate.usage || 0;
      const total = estimate.quota || 0;
      const available = total - used;
      const usagePercentage = total > 0 ? (used / total) * 100 : 0;

      return { used, available, total, usagePercentage };
    } catch (error) {
      console.error('Error estimating storage:', error);
      return { used: 0, available: 0, total: 0, usagePercentage: 0 };
    }
  }

  // Request persistent storage
  async requestPersistentStorage(): Promise<boolean> {
    if (!navigator.storage?.persist) {
      return false;
    }

    try {
      const isPersistent = await navigator.storage.persist();
      console.log(`[CacheManager] Persistent storage: ${isPersistent}`);
      return isPersistent;
    } catch (error) {
      console.error('Error requesting persistent storage:', error);
      return false;
    }
  }
}

// Export singleton instance
export const cacheManager = CacheManager.getInstance();
