/**
 * AppProviders - Proveedor centralizado para todos los contextos
 * Agrupa todos los Context Providers en un solo componente
 */

"use client";

import { ReactNode } from "react";
import { UIProvider } from "./UIContext";
import { SearchProvider } from "./SearchContext";
import { CacheProvider } from "./CacheContext";

// ============================================================================
// Main Provider
// ============================================================================

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * AppProviders component
 * Wraps the application with all necessary context providers
 *
 * Order matters:
 * 1. CacheProvider - Base layer for data caching
 * 2. UIProvider - UI state
 * 3. SearchProvider - Search state (may depend on UI)
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <CacheProvider>
      <UIProvider>
        <SearchProvider>{children}</SearchProvider>
      </UIProvider>
    </CacheProvider>
  );
}

// ============================================================================
// Export individual providers for flexibility
// ============================================================================

export { UIProvider } from "./UIContext";
export { SearchProvider } from "./SearchContext";
export { CacheProvider } from "./CacheContext";
