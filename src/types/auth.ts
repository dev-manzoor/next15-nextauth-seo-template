// Auth-specific type definitions

import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
      provider?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role?: string;
    provider?: string;
  }
}

// Auth provider types
export type AuthProvider = "credentials" | "google" | "github" | "discord";

export interface AuthProviderConfig {
  id: AuthProvider;
  name: string;
  type: "oauth" | "credentials";
  icon?: string;
}

// Auth form types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms?: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
  token: string;
}

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

// Auth state types
export interface AuthState {
  user: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// Auth action types
export type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: any }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "REGISTER_START" }
  | { type: "REGISTER_SUCCESS"; payload: any }
  | { type: "REGISTER_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" };

// Auth hook return types
export interface UseAuthReturn {
  user: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (credentials: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

// Auth context types
export interface AuthContextType extends UseAuthReturn {
  refreshUser: () => Promise<void>;
}
