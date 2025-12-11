/**
 * Translation Cache Service using IndexedDB
 * Provides persistent storage for dynamic translations
 */

import { logger } from "@/shared/utils/logger";

const DB_NAME = "sitimm_translations";
const DB_VERSION = 1;
const STORE_NAME = "translations";

interface TranslationCacheEntry {
  key: string; // formato: "{locale}:{contentType}:{id}:{field}"
  value: string;
  timestamp: number;
  locale: string;
}

class TranslationCacheService {
  private db: IDBDatabase | null = null;
  private initPromise: Promise<void> | null = null;

  /**
   * Initialize IndexedDB connection
   */
  private async init(): Promise<void> {
    if (this.db) return;

    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve, reject) => {
      if (typeof window === "undefined" || !window.indexedDB) {
        logger.warn("IndexedDB not available, cache disabled");
        resolve();
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        logger.error("Failed to open IndexedDB:", request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: "key" });
          store.createIndex("locale", "locale", { unique: false });
          store.createIndex("timestamp", "timestamp", { unique: false });
        }
      };
    });

    return this.initPromise;
  }

  /**
   * Get a translation from cache
   */
  async get(
    locale: string,
    contentType: string,
    id: string,
    field: string
  ): Promise<string | null> {
    try {
      await this.init();
      if (!this.db) return null;

      const key = this.generateKey(locale, contentType, id, field);

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(key);

        request.onsuccess = () => {
          const result = request.result as TranslationCacheEntry | undefined;
          resolve(result ? result.value : null);
        };

        request.onerror = () => {
          logger.error("Error reading from cache:", request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      logger.error("Cache get error:", error);
      return null;
    }
  }

  /**
   * Get multiple translations from cache
   */
  async getBatch(
    locale: string,
    items: Array<{ contentType: string; id: string; field: string }>
  ): Promise<Map<string, string>> {
    const results = new Map<string, string>();

    try {
      await this.init();
      if (!this.db) return results;

      const keys = items.map((item) =>
        this.generateKey(locale, item.contentType, item.id, item.field)
      );

      return new Promise((resolve, _reject) => {
        const transaction = this.db!.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);

        let completed = 0;
        const total = keys.length;

        keys.forEach((key, _index) => {
          const request = store.get(key);

          request.onsuccess = () => {
            const result = request.result as TranslationCacheEntry | undefined;
            if (result) {
              results.set(key, result.value);
            }

            completed++;
            if (completed === total) {
              resolve(results);
            }
          };

          request.onerror = () => {
            completed++;
            if (completed === total) {
              resolve(results);
            }
          };
        });

        if (total === 0) {
          resolve(results);
        }
      });
    } catch (error) {
      logger.error("Cache batch get error:", error);
      return results;
    }
  }

  /**
   * Set a translation in cache
   */
  async set(
    locale: string,
    contentType: string,
    id: string,
    field: string,
    value: string
  ): Promise<void> {
    try {
      await this.init();
      if (!this.db) return;

      const key = this.generateKey(locale, contentType, id, field);
      const entry: TranslationCacheEntry = {
        key,
        value,
        timestamp: Date.now(),
        locale,
      };

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(entry);

        request.onsuccess = () => resolve();
        request.onerror = () => {
          logger.error("Error writing to cache:", request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      logger.error("Cache set error:", error);
    }
  }

  /**
   * Set multiple translations in cache (batch)
   */
  async setBatch(
    locale: string,
    items: Array<{ contentType: string; id: string; field: string; value: string }>
  ): Promise<void> {
    try {
      await this.init();
      if (!this.db) return;

      return new Promise((resolve, _reject) => {
        const transaction = this.db!.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);

        const entries: TranslationCacheEntry[] = items.map((item) => ({
          key: this.generateKey(locale, item.contentType, item.id, item.field),
          value: item.value,
          timestamp: Date.now(),
          locale,
        }));

        let completed = 0;
        const total = entries.length;

        entries.forEach((entry) => {
          const request = store.put(entry);

          request.onsuccess = () => {
            completed++;
            if (completed === total) {
              resolve();
            }
          };

          request.onerror = () => {
            completed++;
            if (completed === total) {
              resolve();
            }
          };
        });

        if (total === 0) {
          resolve();
        }
      });
    } catch (error) {
      logger.error("Cache batch set error:", error);
    }
  }

  /**
   * Clear all translations for a specific locale
   */
  async clearLocale(locale: string): Promise<void> {
    try {
      await this.init();
      if (!this.db) return;

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const index = store.index("locale");
        const request = index.openCursor(IDBKeyRange.only(locale));

        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
          if (cursor) {
            cursor.delete();
            cursor.continue();
          } else {
            resolve();
          }
        };

        request.onerror = () => {
          logger.error("Error clearing locale:", request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      logger.error("Cache clear locale error:", error);
    }
  }

  /**
   * Clear all cached translations
   */
  async clearAll(): Promise<void> {
    try {
      await this.init();
      if (!this.db) return;

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();

        request.onsuccess = () => resolve();
        request.onerror = () => {
          logger.error("Error clearing cache:", request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      logger.error("Cache clear all error:", error);
    }
  }

  /**
   * Get cache statistics
   */
  async getStats(): Promise<{ total: number; byLocale: Record<string, number> }> {
    try {
      await this.init();
      if (!this.db) return { total: 0, byLocale: {} };

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
          const entries = request.result as TranslationCacheEntry[];
          const byLocale: Record<string, number> = {};

          entries.forEach((entry) => {
            byLocale[entry.locale] = (byLocale[entry.locale] || 0) + 1;
          });

          resolve({
            total: entries.length,
            byLocale,
          });
        };

        request.onerror = () => {
          logger.error("Error getting stats:", request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      logger.error("Cache stats error:", error);
      return { total: 0, byLocale: {} };
    }
  }

  /**
   * Generate a unique key for caching
   */
  private generateKey(locale: string, contentType: string, id: string, field: string): string {
    return `${locale}:${contentType}:${id}:${field}`;
  }
}

// Export singleton instance
export const translationCache = new TranslationCacheService();
