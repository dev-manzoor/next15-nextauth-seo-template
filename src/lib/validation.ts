import { z } from "zod";

// Common Zod schemas for reuse
export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

export const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters long")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  );

export const nameSchema = z
  .string()
  .min(1, "Name is required")
  .min(2, "Name must be at least 2 characters long")
  .max(50, "Name must be no more than 50 characters long")
  .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces");

// Auth form schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required")
});

export const registerSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

// User profile schema
export const userProfileSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  bio: z
    .string()
    .max(500, "Bio must be no more than 500 characters")
    .optional(),
  avatar: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal(""))
});

// Contact form schema
export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: z
    .string()
    .min(1, "Subject is required")
    .min(5, "Subject must be at least 5 characters long")
    .max(100, "Subject must be no more than 100 characters long"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters long")
    .max(1000, "Message must be no more than 1000 characters long")
});

// Settings schema
export const settingsSchema = z.object({
  notifications: z.object({
    email: z.boolean().default(true),
    push: z.boolean().default(false),
    marketing: z.boolean().default(false)
  }),
  privacy: z.object({
    profileVisibility: z
      .enum(["public", "private", "friends"])
      .default("public"),
    allowMessages: z.boolean().default(true)
  }),
  theme: z.enum(["light", "dark", "system"]).default("system")
});

// Type inference from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type UserProfileData = z.infer<typeof userProfileSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type SettingsData = z.infer<typeof settingsSchema>;

// Validation helper functions
export const validateLoginForm = (data: unknown) => {
  return loginSchema.safeParse(data);
};

export const validateRegisterForm = (data: unknown) => {
  return registerSchema.safeParse(data);
};

export const validateUserProfile = (data: unknown) => {
  return userProfileSchema.safeParse(data);
};

export const validateContactForm = (data: unknown) => {
  return contactSchema.safeParse(data);
};

export const validateSettings = (data: unknown) => {
  return settingsSchema.safeParse(data);
};

// Utility function to format Zod errors for forms
export const formatZodErrors = (error: z.ZodError): Record<string, string> => {
  const errors: Record<string, string> = {};

  error.errors.forEach((err) => {
    const path = err.path.join(".");
    if (!errors[path]) {
      errors[path] = err.message;
    }
  });

  return errors;
};
