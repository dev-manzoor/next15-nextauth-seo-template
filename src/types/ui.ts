// UI component type definitions

// Button component types
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

// Input component types
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// Card component types
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

// Dialog component types
export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface DialogTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface DialogHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface DialogTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export interface DialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

// Form component types
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export interface FormFieldProps {
  name: string;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export interface FormControlProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

// Toast component types
export interface ToastProps {
  id?: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
  onOpenChange?: (open: boolean) => void;
}

export interface ToastActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  altText: string;
}

// Layout component types
export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  user?: any;
  onSignOut?: () => void;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isOpen?: boolean;
  onToggle?: () => void;
}

// Navigation types
export interface NavItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  isActive?: boolean;
}

// Loading and error types
export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export interface ErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: Error | string;
  retry?: () => void;
}

// Theme types
export type Theme = "light" | "dark" | "system";

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

// Animation types
export interface AnimationProps {
  duration?: number;
  delay?: number;
  easing?: string;
}

// Responsive types
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export interface ResponsiveProps {
  sm?: any;
  md?: any;
  lg?: any;
  xl?: any;
  "2xl"?: any;
}
