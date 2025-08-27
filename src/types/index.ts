// Global type definitions

// User types
export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  role?: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = "user" | "admin" | "moderator";

// Auth types
export interface AuthUser extends User {
  emailVerified?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthSession {
  user: AuthUser;
  expires: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "textarea" | "select" | "checkbox";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormState {
  isSubmitting: boolean;
  errors: FormErrors;
  isValid: boolean;
}

// Component props types
export interface ComponentWithChildren {
  children: React.ReactNode;
}

export interface ComponentWithClassName {
  className?: string;
}

export interface ComponentWithVariant<T = string> {
  variant?: T;
}

// Navigation types
export interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  external?: boolean;
}

export interface SidebarNavItem extends NavItem {
  items?: SidebarNavItem[];
}

// Dashboard types
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalPosts: number;
  totalComments: number;
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

// Database types
export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

// Environment types
export type NodeEnv = "development" | "production" | "test";

export interface EnvironmentConfig {
  NODE_ENV: NodeEnv;
  NEXT_PUBLIC_APP_URL: string;
  NEXTAUTH_SECRET: string;
  NEXTAUTH_URL: string;
  DATABASE_URL: string;
}

// Error types
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    public field?: string,
  ) {
    super(message, "VALIDATION_ERROR", 400);
    this.name = "ValidationError";
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication required") {
    super(message, "AUTHENTICATION_ERROR", 401);
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = "Insufficient permissions") {
    super(message, "AUTHORIZATION_ERROR", 403);
    this.name = "AuthorizationError";
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, "NOT_FOUND_ERROR", 404);
    this.name = "NotFoundError";
  }
}
