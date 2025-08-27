import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Session } from "next-auth";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  // State
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  lastActivity: Date | null;

  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
  updateLastActivity: () => void;

  // Computed
  isSessionExpired: () => boolean;
  getUserDisplayName: () => string;
  hasRole: (role: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        session: null,
        isLoading: true,
        isAuthenticated: false,
        lastActivity: null,

        // Actions
        setUser: (user) => {
          set((state) => ({
            ...state,
            user,
            isAuthenticated: !!user
          }));
        },

        setSession: (session) => {
          set((state) => {
            const user = session?.user
              ? {
                  id: session.user.id || "",
                  name: session.user.name || "",
                  email: session.user.email || "",
                  avatar: session.user.image || undefined,
                  role: (session.user as any).role || "user",
                  createdAt: new Date(),
                  updatedAt: new Date()
                }
              : null;

            return {
              ...state,
              session,
              user,
              isAuthenticated: !!session
            };
          });
        },

        setLoading: (loading) => {
          set((state) => ({
            ...state,
            isLoading: loading
          }));
        },

        updateUser: (updates) => {
          set((state) => ({
            ...state,
            user: state.user
              ? {
                  ...state.user,
                  ...updates,
                  updatedAt: new Date()
                }
              : null
          }));
        },

        logout: () => {
          set(() => ({
            user: null,
            session: null,
            isLoading: false,
            isAuthenticated: false,
            lastActivity: null
          }));
        },

        updateLastActivity: () => {
          set((state) => ({
            ...state,
            lastActivity: new Date()
          }));
        },

        // Computed values
        isSessionExpired: () => {
          const { session } = get();
          if (!session?.expires) return false;
          return new Date() > new Date(session.expires);
        },

        getUserDisplayName: () => {
          const { user } = get();
          return user?.name || user?.email || "Anonymous";
        },

        hasRole: (role: string) => {
          const { user } = get();
          return user?.role === role;
        }
      }),
      {
        name: "auth-store",
        partialize: (state) => ({
          user: state.user,
          lastActivity: state.lastActivity
        })
      }
    ),
    {
      name: "auth-store"
    }
  )
);

// Selectors for optimized re-renders
export const useUser = () => useAuthStore((state) => state.user);
export const useSession = () => useAuthStore((state) => state.session);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);

// Individual action selectors (prevents unnecessary re-renders)
export const useSetUser = () => useAuthStore((state) => state.setUser);
export const useSetSession = () => useAuthStore((state) => state.setSession);
export const useSetLoading = () => useAuthStore((state) => state.setLoading);
export const useUpdateUser = () => useAuthStore((state) => state.updateUser);
export const useLogout = () => useAuthStore((state) => state.logout);
export const useUpdateLastActivity = () =>
  useAuthStore((state) => state.updateLastActivity);

// Computed selectors
export const useIsSessionExpired = () =>
  useAuthStore((state) => state.isSessionExpired);
export const useGetUserDisplayName = () =>
  useAuthStore((state) => state.getUserDisplayName);
export const useHasRole = () => useAuthStore((state) => state.hasRole);

// Legacy grouped selectors (with stable references)
export const useAuthActions = () => {
  const setUser = useSetUser();
  const setSession = useSetSession();
  const setLoading = useSetLoading();
  const updateUser = useUpdateUser();
  const logout = useLogout();
  const updateLastActivity = useUpdateLastActivity();

  return {
    setUser,
    setSession,
    setLoading,
    updateUser,
    logout,
    updateLastActivity
  };
};

export const useAuthComputed = () => {
  const isSessionExpired = useIsSessionExpired();
  const getUserDisplayName = useGetUserDisplayName();
  const hasRole = useHasRole();

  return {
    isSessionExpired,
    getUserDisplayName,
    hasRole
  };
};
