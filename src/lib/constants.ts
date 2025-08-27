// Application constants

export const APP_CONFIG = {
  name: "NextAuth Template",
  description: "A modern Next.js application with Auth.js authentication",
  version: "1.0.0",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
} as const;

export const AUTH_CONFIG = {
  loginRedirect: "/dashboard",
  logoutRedirect: "/",
  registerRedirect: "/dashboard",
  sessionMaxAge: 30 * 24 * 60 * 60, // 30 days in seconds
} as const;

export const API_ROUTES = {
  auth: {
    login: "/api/auth/signin",
    logout: "/api/auth/signout",
    register: "/api/v1/users",
    session: "/api/auth/session",
  },
  users: {
    profile: "/api/v1/users/profile",
    update: "/api/v1/users",
  },
} as const;

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  profile: "/dashboard/profile",
} as const;

export const UI_CONFIG = {
  toastDuration: 5000,
  loadingDelay: 300,
  debounceDelay: 300,
} as const;

export const PAGINATION = {
  defaultPageSize: 10,
  maxPageSize: 100,
} as const;

export const VALIDATION = {
  email: {
    maxLength: 254,
  },
  password: {
    minLength: 8,
    maxLength: 128,
  },
  name: {
    minLength: 2,
    maxLength: 50,
  },
} as const;

// Environment-specific constants
export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";
export const isTest = process.env.NODE_ENV === "test";

// Feature flags
export const FEATURES = {
  enableRegistration: true,
  enablePasswordReset: false,
  enableSocialLogin: false,
  enableTwoFactor: false,
} as const;
