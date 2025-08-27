// Validation utilities

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface ValidationRule<T = any> {
  validate: (value: T) => boolean;
  message: string;
}

export class Validator {
  private rules: Record<string, ValidationRule[]> = {};

  addRule(field: string, rule: ValidationRule): Validator {
    if (!this.rules[field]) {
      this.rules[field] = [];
    }
    this.rules[field].push(rule);
    return this;
  }

  validate(data: Record<string, any>): ValidationResult {
    const errors: Record<string, string> = {};
    let isValid = true;

    for (const [field, rules] of Object.entries(this.rules)) {
      const value = data[field];

      for (const rule of rules) {
        if (!rule.validate(value)) {
          errors[field] = rule.message;
          isValid = false;
          break; // Stop at first error for this field
        }
      }
    }

    return { isValid, errors };
  }
}

// Common validation rules
export const validationRules = {
  required: (message = "This field is required"): ValidationRule => ({
    validate: (value) => value !== null && value !== undefined && value !== "",
    message,
  }),

  email: (
    message = "Please enter a valid email address",
  ): ValidationRule<string> => ({
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || ""),
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule<string> => ({
    validate: (value) => (value || "").length >= min,
    message: message || `Must be at least ${min} characters long`,
  }),

  maxLength: (max: number, message?: string): ValidationRule<string> => ({
    validate: (value) => (value || "").length <= max,
    message: message || `Must be no more than ${max} characters long`,
  }),

  pattern: (
    regex: RegExp,
    message = "Invalid format",
  ): ValidationRule<string> => ({
    validate: (value) => regex.test(value || ""),
    message,
  }),

  numeric: (message = "Must be a number"): ValidationRule => ({
    validate: (value) => !isNaN(Number(value)) && !isNaN(parseFloat(value)),
    message,
  }),

  min: (min: number, message?: string): ValidationRule<number> => ({
    validate: (value) => Number(value) >= min,
    message: message || `Must be at least ${min}`,
  }),

  max: (max: number, message?: string): ValidationRule<number> => ({
    validate: (value) => Number(value) <= max,
    message: message || `Must be no more than ${max}`,
  }),
};

// Convenience functions for common validations
export const validateEmail = (email: string): ValidationResult => {
  const validator = new Validator();
  validator.addRule("email", validationRules.required());
  validator.addRule("email", validationRules.email());
  return validator.validate({ email });
};

export const validatePassword = (password: string): ValidationResult => {
  const validator = new Validator();
  validator.addRule("password", validationRules.required());
  validator.addRule(
    "password",
    validationRules.minLength(8, "Password must be at least 8 characters"),
  );
  return validator.validate({ password });
};

export const validateLoginForm = (data: {
  email: string;
  password: string;
}): ValidationResult => {
  const validator = new Validator();
  validator.addRule("email", validationRules.required("Email is required"));
  validator.addRule("email", validationRules.email());
  validator.addRule(
    "password",
    validationRules.required("Password is required"),
  );
  return validator.validate(data);
};

export const validateRegisterForm = (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): ValidationResult => {
  const validator = new Validator();
  validator.addRule("name", validationRules.required("Name is required"));
  validator.addRule(
    "name",
    validationRules.minLength(2, "Name must be at least 2 characters"),
  );
  validator.addRule("email", validationRules.required("Email is required"));
  validator.addRule("email", validationRules.email());
  validator.addRule(
    "password",
    validationRules.required("Password is required"),
  );
  validator.addRule(
    "password",
    validationRules.minLength(8, "Password must be at least 8 characters"),
  );
  validator.addRule(
    "confirmPassword",
    validationRules.required("Please confirm your password"),
  );
  validator.addRule("confirmPassword", {
    validate: (value) => value === data.password,
    message: "Passwords do not match",
  });
  return validator.validate(data);
};
