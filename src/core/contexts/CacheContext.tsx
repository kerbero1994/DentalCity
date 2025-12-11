/**
 * CacheContext - Gestión de cache de datos del cliente
 * Cachea resultados de API para reducir llamadas y mejorar performance
 */

"use client";

import { logger } from "@/shared/utils/logger";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useMemo,
  ReactNode,
  useEffect,
} from "react";

// ============================================================================
// Types
// ============================================================================

interface CacheEntry<T = unknown> {
  data: T;
  timestamp: number;
  expiresAt: number;
  key: string;
}

interface CacheState {
  entries: Map<string, CacheEntry>;
  hits: number;
  misses: number;
  size: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds (default: 5 minutes)
  staleWhileRevalidate?: boolean; // Return stale data while fetching fresh
  maxAge?: number; // Maximum age before forced refresh
}

interface CacheContextValue extends CacheState {
  // Get/Set actions
  get: <T>(key: string) => T | null;
  set: <T>(key: string, data: T, options?: CacheOptions) => void;
  has: (key: string) => boolean;
  delete: (key: string) => boolean;

  // Bulk actions
  clear: () => void;
  clearExpired: () => void;
  clearByPrefix: (prefix: string) => void;

  // Cache helpers
  invalidate: (key: string) => void;
  invalidateByPrefix: (prefix: string) => void;
  refresh: <T>(key: string, fetcher: () => Promise<T>, options?: CacheOptions) => Promise<T>;

  // Stats
  getStats: () => {
    hits: number;
    misses: number;
    hitRate: number;
    size: number;
    keys: string[];
  };
  resetStats: () => void;
}

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 100; // Maximum number of entries

// ============================================================================
// Context
// ============================================================================

const CacheContext = createContext<CacheContextValue | undefined>(undefined);

// ============================================================================
// Provider
// ============================================================================

interface CacheProviderProps {
  children: ReactNode;
}

export function CacheProvider({ children }: CacheProviderProps) {
  // Use ref for the Map to avoid re-creating callbacks on every entry change
  const entriesRef = useRef<Map<string, CacheEntry>>(new Map());

  // Only track stats in state (triggers re-renders only when stats change)
  const [stats, setStats] = useState({ hits: 0, misses: 0, size: 0 });

  // ============================================================================
  // Get/Set Actions (stable callbacks - no dependencies on entries)
  // ============================================================================

  const get = useCallback(<T,>(key: string): T | null => {
    const entry = entriesRef.current.get(key);

    if (!entry) {
      setStats((prev) => ({ ...prev, misses: prev.misses + 1 }));
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      entriesRef.current.delete(key);
      setStats((prev) => ({
        ...prev,
        size: entriesRef.current.size,
        misses: prev.misses + 1,
      }));
      return null;
    }

    setStats((prev) => ({ ...prev, hits: prev.hits + 1 }));
    return entry.data as T;
  }, []);

  const set = useCallback(<T,>(key: string, data: T, options: CacheOptions = {}) => {
    const ttl = options.ttl ?? DEFAULT_TTL;
    const timestamp = Date.now();
    const expiresAt = timestamp + ttl;

    const entry: CacheEntry<T> = {
      data,
      timestamp,
      expiresAt,
      key,
    };

    // If cache is full, remove oldest entry
    if (entriesRef.current.size >= MAX_CACHE_SIZE && !entriesRef.current.has(key)) {
      const oldestKey = Array.from(entriesRef.current.entries()).sort(
        (a, b) => a[1].timestamp - b[1].timestamp
      )[0]?.[0];
      if (oldestKey) {
        entriesRef.current.delete(oldestKey);
      }
    }

    entriesRef.current.set(key, entry);
    setStats((prev) => ({ ...prev, size: entriesRef.current.size }));
  }, []);

  const has = useCallback((key: string): boolean => {
    const entry = entriesRef.current.get(key);
    if (!entry) return false;

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      return false;
    }

    return true;
  }, []);

  const deleteEntry = useCallback((key: string): boolean => {
    const existed = entriesRef.current.has(key);
    entriesRef.current.delete(key);
    setStats((prev) => ({ ...prev, size: entriesRef.current.size }));
    return existed;
  }, []);

  // ============================================================================
  // Bulk Actions
  // ============================================================================

  const clear = useCallback(() => {
    entriesRef.current.clear();
    setStats((prev) => ({ ...prev, size: 0 }));
  }, []);

  const clearExpired = useCallback(() => {
    const now = Date.now();
    let changed = false;

    entriesRef.current.forEach((entry, key) => {
      if (entry.expiresAt && entry.expiresAt < now) {
        entriesRef.current.delete(key);
        changed = true;
      }
    });

    if (changed) {
      setStats((prev) => ({ ...prev, size: entriesRef.current.size }));
    }
  }, []);

  const clearByPrefix = useCallback((prefix: string) => {
    let removed = 0;

    entriesRef.current.forEach((_, key) => {
      if (key.startsWith(prefix)) {
        entriesRef.current.delete(key);
        removed++;
      }
    });

    if (removed > 0) {
      setStats((prev) => ({ ...prev, size: entriesRef.current.size }));
    }
  }, []);

  // Clean up expired entries periodically
  useEffect(() => {
    const interval = setInterval(clearExpired, 60000); // Every minute
    return () => clearInterval(interval);
  }, [clearExpired]);

  // ============================================================================
  // Cache Helpers
  // ============================================================================

  const invalidate = useCallback(
    (key: string) => {
      deleteEntry(key);
    },
    [deleteEntry]
  );

  const invalidateByPrefix = useCallback(
    (prefix: string) => {
      clearByPrefix(prefix);
    },
    [clearByPrefix]
  );

  const refresh = useCallback(
    async <T,>(key: string, fetcher: () => Promise<T>, options: CacheOptions = {}): Promise<T> => {
      try {
        const data = await fetcher();
        set(key, data, options);
        return data;
      } catch (error) {
        logger.error(`Failed to refresh cache for key: ${key}`, error);
        throw error;
      }
    },
    [set]
  );

  // ============================================================================
  // Stats
  // ============================================================================

  const getStats = useCallback(() => {
    const { hits, misses, size } = stats;
    const hitRate = hits + misses > 0 ? (hits / (hits + misses)) * 100 : 0;

    return {
      hits,
      misses,
      hitRate,
      size,
      keys: Array.from(entriesRef.current.keys()),
    };
  }, [stats]);

  const resetStats = useCallback(() => {
    setStats((prev) => ({ ...prev, hits: 0, misses: 0 }));
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const value: CacheContextValue = useMemo(
    () => ({
      entries: entriesRef.current,
      hits: stats.hits,
      misses: stats.misses,
      size: stats.size,
      get,
      set,
      has,
      delete: deleteEntry,
      clear,
      clearExpired,
      clearByPrefix,
      invalidate,
      invalidateByPrefix,
      refresh,
      getStats,
      resetStats,
    }),
    [
      stats,
      get,
      set,
      has,
      deleteEntry,
      clear,
      clearExpired,
      clearByPrefix,
      invalidate,
      invalidateByPrefix,
      refresh,
      getStats,
      resetStats,
    ]
  );

  return <CacheContext.Provider value={value}>{children}</CacheContext.Provider>;
}

// ============================================================================
// Hook
// ============================================================================

export function useCache() {
  const context = useContext(CacheContext);
  if (context === undefined) {
    throw new Error("useCache must be used within a CacheProvider");
  }
  return context;
}

// ============================================================================
// Helper Hooks
// ============================================================================

/**
 * Hook for caching API data with automatic fetching
 */
export function useCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions & { enabled?: boolean } = {}
) {
  const cache = useCache();
  const [data, setData] = useState<T | null>(cache.get<T>(key));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { enabled = true } = options;

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await cache.refresh(key, fetcher, options);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, [key, fetcher, enabled, options, cache]);

  // Fetch on mount if not cached
  useEffect(() => {
    const cached = cache.get<T>(key);
    if (cached) {
      setData(cached);
    } else if (enabled) {
      fetchData();
    }
  }, [key, enabled, cache, fetchData]);

  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  const invalidate = useCallback(() => {
    cache.invalidate(key);
    setData(null);
  }, [cache, key]);

  return {
    data,
    isLoading,
    error,
    refetch,
    invalidate,
  };
}

/**
 * Hook for feature-specific cache keys
 */
export function useCacheKeys() {
  return {
    events: {
      all: (locale: string) => `events:all:${locale}`,
      byId: (id: string, locale: string) => `events:${id}:${locale}`,
      byType: (typeId: number, locale: string) => `events:type:${typeId}:${locale}`,
      upcoming: (locale: string) => `events:upcoming:${locale}`,
      search: (query: string, locale: string) => `events:search:${query}:${locale}`,
    },
    programs: {
      all: (locale: string) => `programs:all:${locale}`,
      bySlug: (slug: string, locale: string) => `programs:${slug}:${locale}`,
    },
    magazines: {
      all: () => "magazines:all",
      byId: (id: string) => `magazines:${id}`,
      byYear: (year: number) => `magazines:year:${year}`,
    },
    faq: {
      all: (locale: string) => `faq:all:${locale}`,
      byType: (typeId: number, locale: string) => `faq:type:${typeId}:${locale}`,
    },
    blog: {
      all: (locale: string) => `blog:all:${locale}`,
      byId: (id: string, locale: string) => `blog:${id}:${locale}`,
      byCategory: (category: string, locale: string) => `blog:category:${category}:${locale}`,
    },
  };
}
