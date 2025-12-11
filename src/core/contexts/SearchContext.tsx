/**
 * SearchContext - Gestión de búsqueda y filtros
 * Maneja queries, filtros, ordenamiento y resultados de búsqueda
 */

"use client";

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";
import type { DateRange } from "@/core/types/legacy/common";

// ============================================================================
// Types
// ============================================================================

type SortOrder = "asc" | "desc";
type ViewMode = "grid" | "list";

interface SearchFilters {
  // General
  query: string;
  category?: string;
  type?: string;
  tags?: string[];

  // Date filters
  dateRange?: DateRange;
  dateFrom?: string;
  dateTo?: string;

  // Sorting
  sortBy?: string;
  sortOrder: SortOrder;

  // Pagination
  page: number;
  pageSize: number;

  // View
  viewMode: ViewMode;

  // Feature-specific filters
  eventType?: number;
  programType?: string;
  magazineYear?: number;
  faqType?: number;
  blogCategory?: string;

  // Status filters
  status?: string[];
  isPrivate?: boolean;
  enabled?: boolean;
}

interface SearchHistory {
  id: string;
  query: string;
  filters: Partial<SearchFilters>;
  timestamp: number;
  resultCount: number;
}

interface SearchState {
  filters: SearchFilters;
  history: SearchHistory[];
  recentSearches: string[];
  popularSearches: string[];
  isSearching: boolean;
  hasResults: boolean;
  resultCount: number;
}

interface SearchContextValue extends SearchState {
  // Query actions
  setQuery: (query: string) => void;
  clearQuery: () => void;

  // Filter actions
  setFilter: <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
  resetFilters: () => void;

  // Sorting
  setSortBy: (field: string, order?: SortOrder) => void;
  toggleSortOrder: () => void;

  // Pagination
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setPageSize: (size: number) => void;

  // View mode
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;

  // History
  addToHistory: (query: string, filters: Partial<SearchFilters>, resultCount: number) => void;
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;

  // Recent searches
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Search state
  setSearching: (isSearching: boolean) => void;
  setResults: (count: number) => void;
}

// ============================================================================
// Default Values
// ============================================================================

const defaultFilters: SearchFilters = {
  query: "",
  sortOrder: "desc",
  page: 1,
  pageSize: 12,
  viewMode: "grid",
};

// ============================================================================
// Context
// ============================================================================

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

// ============================================================================
// Provider
// ============================================================================

interface SearchProviderProps {
  children: ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [state, setState] = useState<SearchState>({
    filters: defaultFilters,
    history: [],
    recentSearches: [],
    popularSearches: [],
    isSearching: false,
    hasResults: false,
    resultCount: 0,
  });

  // ============================================================================
  // Query Actions
  // ============================================================================

  const setQuery = useCallback((query: string) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, query, page: 1 },
    }));
  }, []);

  const clearQuery = useCallback(() => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, query: "", page: 1 },
    }));
  }, []);

  // ============================================================================
  // Filter Actions
  // ============================================================================

  const setFilter = useCallback(
    <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
      setState((prev) => ({
        ...prev,
        filters: { ...prev.filters, [key]: value, page: 1 },
      }));
    },
    []
  );

  const setFilters = useCallback((filters: Partial<SearchFilters>) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, ...filters, page: 1 },
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setState((prev) => ({
      ...prev,
      filters: { ...defaultFilters, query: prev.filters.query },
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setState((prev) => ({
      ...prev,
      filters: defaultFilters,
    }));
  }, []);

  // ============================================================================
  // Sorting Actions
  // ============================================================================

  const setSortBy = useCallback((field: string, order: SortOrder = "asc") => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, sortBy: field, sortOrder: order },
    }));
  }, []);

  const toggleSortOrder = useCallback(() => {
    setState((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        sortOrder: prev.filters.sortOrder === "asc" ? "desc" : "asc",
      },
    }));
  }, []);

  // ============================================================================
  // Pagination Actions
  // ============================================================================

  const setPage = useCallback((page: number) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, page },
    }));
  }, []);

  const nextPage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, page: prev.filters.page + 1 },
    }));
  }, []);

  const prevPage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, page: Math.max(1, prev.filters.page - 1) },
    }));
  }, []);

  const setPageSize = useCallback((size: number) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, pageSize: size, page: 1 },
    }));
  }, []);

  // ============================================================================
  // View Mode Actions
  // ============================================================================

  const setViewMode = useCallback((mode: ViewMode) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, viewMode: mode },
    }));
  }, []);

  const toggleViewMode = useCallback(() => {
    setState((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        viewMode: prev.filters.viewMode === "grid" ? "list" : "grid",
      },
    }));
  }, []);

  // ============================================================================
  // History Actions
  // ============================================================================

  const addToHistory = useCallback(
    (query: string, filters: Partial<SearchFilters>, resultCount: number) => {
      const historyItem: SearchHistory = {
        id: `history-${Date.now()}`,
        query,
        filters,
        timestamp: Date.now(),
        resultCount,
      };

      setState((prev) => ({
        ...prev,
        history: [historyItem, ...prev.history.slice(0, 19)], // Keep last 20
      }));
    },
    []
  );

  const clearHistory = useCallback(() => {
    setState((prev) => ({ ...prev, history: [] }));
  }, []);

  const removeFromHistory = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      history: prev.history.filter((h) => h.id !== id),
    }));
  }, []);

  // ============================================================================
  // Recent Searches Actions
  // ============================================================================

  const addRecentSearch = useCallback((query: string) => {
    if (!query.trim()) return;

    setState((prev) => {
      const filtered = prev.recentSearches.filter((q) => q !== query);
      return {
        ...prev,
        recentSearches: [query, ...filtered].slice(0, 10), // Keep last 10
      };
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setState((prev) => ({ ...prev, recentSearches: [] }));
  }, []);

  // ============================================================================
  // Search State Actions
  // ============================================================================

  const setSearching = useCallback((isSearching: boolean) => {
    setState((prev) => ({ ...prev, isSearching }));
  }, []);

  const setResults = useCallback((count: number) => {
    setState((prev) => ({
      ...prev,
      resultCount: count,
      hasResults: count > 0,
    }));
  }, []);

  // Memoize context value - only recalculates when state changes
  // All callbacks are stable (empty dependency arrays) so only state matters
  const value: SearchContextValue = useMemo(
    () => ({
      ...state,
      setQuery,
      clearQuery,
      setFilter,
      setFilters,
      clearFilters,
      resetFilters,
      setSortBy,
      toggleSortOrder,
      setPage,
      nextPage,
      prevPage,
      setPageSize,
      setViewMode,
      toggleViewMode,
      addToHistory,
      clearHistory,
      removeFromHistory,
      addRecentSearch,
      clearRecentSearches,
      setSearching,
      setResults,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- callbacks are stable ([] deps)
    [state]
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

// ============================================================================
// Hook
// ============================================================================

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

// ============================================================================
// Helper Hooks
// ============================================================================

/**
 * Hook for paginated results
 */
export function usePagination() {
  const { filters, setPage, nextPage, prevPage, setPageSize } = useSearch();

  return useMemo(() => {
    const totalPages = (totalItems: number) => Math.ceil(totalItems / filters.pageSize);
    const hasPrevPage = filters.page > 1;
    const hasNextPage = (totalItems: number) => filters.page < totalPages(totalItems);

    return {
      page: filters.page,
      pageSize: filters.pageSize,
      setPage,
      nextPage,
      prevPage,
      setPageSize,
      hasPrevPage,
      hasNextPage,
      totalPages,
    };
  }, [filters.page, filters.pageSize, setPage, nextPage, prevPage, setPageSize]);
}

/**
 * Hook for active filters count
 */
export function useActiveFiltersCount() {
  const { filters } = useSearch();

  return useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.type) count++;
    if (filters.tags && filters.tags.length > 0) count++;
    if (filters.dateRange) count++;
    if (filters.eventType) count++;
    if (filters.programType) count++;
    if (filters.magazineYear) count++;
    if (filters.faqType) count++;
    if (filters.blogCategory) count++;
    if (filters.status && filters.status.length > 0) count++;

    return count;
  }, [filters]);
}
