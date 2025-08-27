import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { subscribeWithSelector } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";
export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface Modal {
  id: string;
  title: string;
  content: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeable?: boolean;
  onClose?: () => void;
}

export interface UIState {
  // Theme
  theme: Theme;

  // Layout
  sidebarOpen: boolean;
  headerFixed: boolean;

  // Loading states
  globalLoading: boolean;
  pageLoading: boolean;

  // Toasts
  toasts: Toast[];

  // Modals
  modals: Modal[];

  // Form states
  formSubmitting: boolean;

  // Actions
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setHeaderFixed: (fixed: boolean) => void;
  setGlobalLoading: (loading: boolean) => void;
  setPageLoading: (loading: boolean) => void;
  setFormSubmitting: (submitting: boolean) => void;

  // Toast actions
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;

  // Modal actions
  openModal: (modal: Omit<Modal, "id">) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set, get) => ({
          // Initial state
          theme: "system",
          sidebarOpen: false,
          headerFixed: true,
          globalLoading: false,
          pageLoading: false,
          toasts: [],
          modals: [],
          formSubmitting: false,

          // Theme actions
          setTheme: (theme) => set({ theme }),

          // Layout actions
          toggleSidebar: () =>
            set((state) => ({ sidebarOpen: !state.sidebarOpen })),
          setSidebarOpen: (open) => set({ sidebarOpen: open }),
          setHeaderFixed: (fixed) => set({ headerFixed: fixed }),

          // Loading actions
          setGlobalLoading: (loading) => set({ globalLoading: loading }),
          setPageLoading: (loading) => set({ pageLoading: loading }),
          setFormSubmitting: (submitting) =>
            set({ formSubmitting: submitting }),

          // Toast actions
          addToast: (toast) => {
            const id = crypto.randomUUID();
            const newToast: Toast = {
              ...toast,
              id,
              duration: toast.duration ?? 5000
            };

            set((state) => ({
              toasts: [...state.toasts, newToast]
            }));

            // Auto-remove toast after duration
            if (newToast.duration && newToast.duration > 0) {
              setTimeout(() => {
                get().removeToast(id);
              }, newToast.duration);
            }
          },

          removeToast: (id) =>
            set((state) => ({
              toasts: state.toasts.filter((toast) => toast.id !== id)
            })),

          clearToasts: () => set({ toasts: [] }),

          // Modal actions
          openModal: (modal) => {
            const id = crypto.randomUUID();
            const newModal: Modal = { ...modal, id };

            set((state) => ({
              modals: [...state.modals, newModal]
            }));
          },

          closeModal: (id) =>
            set((state) => ({
              modals: state.modals.filter((modal) => modal.id !== id)
            })),

          closeAllModals: () => set({ modals: [] })
        }),
        {
          name: "ui-store",
          partialize: (state) => ({
            theme: state.theme,
            sidebarOpen: state.sidebarOpen,
            headerFixed: state.headerFixed
          })
        }
      )
    ),
    {
      name: "ui-store"
    }
  )
);

// Selectors for specific UI state
export const useTheme = () => useUIStore((state) => state.theme);
export const useSetTheme = () => useUIStore((state) => state.setTheme);

// Individual sidebar selectors
export const useSidebarOpen = () => useUIStore((state) => state.sidebarOpen);
export const useToggleSidebar = () =>
  useUIStore((state) => state.toggleSidebar);
export const useSetSidebarOpen = () =>
  useUIStore((state) => state.setSidebarOpen);

// Individual loading selectors
export const useGlobalLoading = () =>
  useUIStore((state) => state.globalLoading);
export const usePageLoading = () => useUIStore((state) => state.pageLoading);
export const useFormSubmitting = () =>
  useUIStore((state) => state.formSubmitting);
export const useSetGlobalLoading = () =>
  useUIStore((state) => state.setGlobalLoading);
export const useSetPageLoading = () =>
  useUIStore((state) => state.setPageLoading);
export const useSetFormSubmitting = () =>
  useUIStore((state) => state.setFormSubmitting);

// Individual toast selectors
export const useToastList = () => useUIStore((state) => state.toasts);
export const useAddToast = () => useUIStore((state) => state.addToast);
export const useRemoveToast = () => useUIStore((state) => state.removeToast);
export const useClearToasts = () => useUIStore((state) => state.clearToasts);

// Individual modal selectors
export const useModalList = () => useUIStore((state) => state.modals);
export const useOpenModal = () => useUIStore((state) => state.openModal);
export const useCloseModal = () => useUIStore((state) => state.closeModal);
export const useCloseAllModals = () =>
  useUIStore((state) => state.closeAllModals);

// Legacy grouped selectors with stable references
export const useSidebar = () => {
  const isOpen = useSidebarOpen();
  const toggle = useToggleSidebar();
  const setOpen = useSetSidebarOpen();

  return { isOpen, toggle, setOpen };
};

export const useLoading = () => {
  const global = useGlobalLoading();
  const page = usePageLoading();
  const form = useFormSubmitting();
  const setGlobal = useSetGlobalLoading();
  const setPage = useSetPageLoading();
  const setForm = useSetFormSubmitting();

  return { global, page, form, setGlobal, setPage, setForm };
};

export const useToasts = () => {
  const toasts = useToastList();
  const add = useAddToast();
  const remove = useRemoveToast();
  const clear = useClearToasts();

  return { toasts, add, remove, clear };
};

export const useModals = () => {
  const modals = useModalList();
  const open = useOpenModal();
  const close = useCloseModal();
  const closeAll = useCloseAllModals();

  return { modals, open, close, closeAll };
};

// Helper hooks for common UI operations
export const useToast = () => {
  const add = useAddToast();

  return {
    success: (title: string, message?: string) =>
      add({ type: "success", title, message }),
    error: (title: string, message?: string) =>
      add({ type: "error", title, message }),
    warning: (title: string, message?: string) =>
      add({ type: "warning", title, message }),
    info: (title: string, message?: string) =>
      add({ type: "info", title, message })
  };
};
