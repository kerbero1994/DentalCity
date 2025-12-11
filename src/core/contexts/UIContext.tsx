/**
 * UIContext - Gestión de estado global de UI
 * Maneja sidebar, modales, notificaciones, menú móvil
 * NOTA: El tema se maneja con next-themes (ThemeProvider)
 */

"use client";

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";

// ============================================================================
// Types
// ============================================================================

interface Modal {
  id: string;
  isOpen: boolean;
  content?: ReactNode;
  onClose?: () => void;
}

interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface UIState {
  // Sidebar
  isSidebarOpen: boolean;
  sidebarVariant: "default" | "compact";

  // Modals
  modals: Modal[];

  // Notifications
  notifications: Notification[];

  // Loading states
  globalLoading: boolean;
  loadingMessage?: string;

  // Mobile
  isMobileMenuOpen: boolean;
}

interface UIContextValue extends UIState {
  // Sidebar actions
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  setSidebarVariant: (variant: UIState["sidebarVariant"]) => void;

  // Modal actions
  openModal: (id: string, content?: ReactNode, onClose?: () => void) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  isModalOpen: (id: string) => boolean;

  // Notification actions
  addNotification: (notification: Omit<Notification, "id">) => string;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  // Loading actions
  setGlobalLoading: (loading: boolean, message?: string) => void;

  // Mobile menu
  toggleMobileMenu: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
}

// ============================================================================
// Context
// ============================================================================

const UIContext = createContext<UIContextValue | undefined>(undefined);

// ============================================================================
// Provider
// ============================================================================

interface UIProviderProps {
  children: ReactNode;
}

export function UIProvider({ children }: UIProviderProps) {
  const [state, setState] = useState<UIState>({
    isSidebarOpen: false,
    sidebarVariant: "default",
    modals: [],
    notifications: [],
    globalLoading: false,
    isMobileMenuOpen: false,
  });

  // ============================================================================
  // Sidebar Actions
  // ============================================================================

  const toggleSidebar = useCallback(() => {
    setState((prev) => ({ ...prev, isSidebarOpen: !prev.isSidebarOpen }));
  }, []);

  const openSidebar = useCallback(() => {
    setState((prev) => ({ ...prev, isSidebarOpen: true }));
  }, []);

  const closeSidebar = useCallback(() => {
    setState((prev) => ({ ...prev, isSidebarOpen: false }));
  }, []);

  const setSidebarVariant = useCallback((variant: UIState["sidebarVariant"]) => {
    setState((prev) => ({ ...prev, sidebarVariant: variant }));
  }, []);

  // ============================================================================
  // Modal Actions
  // ============================================================================

  const openModal = useCallback((id: string, content?: ReactNode, onClose?: () => void) => {
    setState((prev) => ({
      ...prev,
      modals: [...prev.modals.filter((m) => m.id !== id), { id, isOpen: true, content, onClose }],
    }));
  }, []);

  const closeModal = useCallback((id: string) => {
    setState((prev) => {
      const modal = prev.modals.find((m) => m.id === id);
      if (modal?.onClose) {
        modal.onClose();
      }
      return {
        ...prev,
        modals: prev.modals.filter((m) => m.id !== id),
      };
    });
  }, []);

  const closeAllModals = useCallback(() => {
    setState((prev) => {
      prev.modals.forEach((modal) => {
        if (modal.onClose) {
          modal.onClose();
        }
      });
      return { ...prev, modals: [] };
    });
  }, []);

  const isModalOpen = useCallback(
    (id: string) => {
      return state.modals.some((m) => m.id === id && m.isOpen);
    },
    [state.modals]
  );

  // ============================================================================
  // Notification Actions
  // ============================================================================

  const removeNotification = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.filter((n) => n.id !== id),
    }));
  }, []);

  const addNotification = useCallback(
    (notification: Omit<Notification, "id">) => {
      const id = `notification-${Date.now()}-${Math.random()}`;
      const newNotification: Notification = { ...notification, id };

      setState((prev) => ({
        ...prev,
        notifications: [...prev.notifications, newNotification],
      }));

      // Auto-remove after duration
      const duration = notification.duration ?? 5000;
      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }

      return id;
    },
    [removeNotification]
  );

  const clearNotifications = useCallback(() => {
    setState((prev) => ({ ...prev, notifications: [] }));
  }, []);

  // ============================================================================
  // Loading Actions
  // ============================================================================

  const setGlobalLoading = useCallback((loading: boolean, message?: string) => {
    setState((prev) => ({ ...prev, globalLoading: loading, loadingMessage: message }));
  }, []);

  // ============================================================================
  // Mobile Menu Actions
  // ============================================================================

  const toggleMobileMenu = useCallback(() => {
    setState((prev) => ({ ...prev, isMobileMenuOpen: !prev.isMobileMenuOpen }));
  }, []);

  const openMobileMenu = useCallback(() => {
    setState((prev) => ({ ...prev, isMobileMenuOpen: true }));
  }, []);

  const closeMobileMenu = useCallback(() => {
    setState((prev) => ({ ...prev, isMobileMenuOpen: false }));
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const value: UIContextValue = useMemo(
    () => ({
      ...state,
      toggleSidebar,
      openSidebar,
      closeSidebar,
      setSidebarVariant,
      openModal,
      closeModal,
      closeAllModals,
      isModalOpen,
      addNotification,
      removeNotification,
      clearNotifications,
      setGlobalLoading,
      toggleMobileMenu,
      openMobileMenu,
      closeMobileMenu,
    }),
    [
      state,
      toggleSidebar,
      openSidebar,
      closeSidebar,
      setSidebarVariant,
      openModal,
      closeModal,
      closeAllModals,
      isModalOpen,
      addNotification,
      removeNotification,
      clearNotifications,
      setGlobalLoading,
      toggleMobileMenu,
      openMobileMenu,
      closeMobileMenu,
    ]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

// ============================================================================
// Hook
// ============================================================================

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}

// ============================================================================
// Helper Hooks
// ============================================================================

/**
 * Hook for toast-style notifications
 */
export function useToast() {
  const { addNotification } = useUI();

  return useMemo(
    () => ({
      success: (message: string, duration?: number) =>
        addNotification({ type: "success", message, duration }),
      error: (message: string, duration?: number) =>
        addNotification({ type: "error", message, duration }),
      warning: (message: string, duration?: number) =>
        addNotification({ type: "warning", message, duration }),
      info: (message: string, duration?: number) =>
        addNotification({ type: "info", message, duration }),
    }),
    [addNotification]
  );
}
