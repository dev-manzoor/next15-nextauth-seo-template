// Object utility functions

export function isEmpty(obj: unknown): boolean {
  if (obj == null) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === "object") return Object.keys(obj).length === 0;
  if (typeof obj === "string") return obj.trim().length === 0;
  return false;
}

export function isPlainObject(obj: unknown): boolean {
  return obj != null && typeof obj === "object" && obj.constructor === Object;
}

export function clone<T>(obj: T): T {
  if (obj == null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (Array.isArray(obj)) return obj.map(clone) as T;

  const cloned = {} as T;
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      cloned[key] = clone(obj[key]);
    }
  }
  return cloned;
}

export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;

  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  if (typeof a === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!deepEqual(a[key as keyof typeof a], b[key as keyof typeof b]))
        return false;
    }
    return true;
  }

  return false;
}

export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
}

export function merge<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target };
  Object.keys(source).forEach((key) => {
    const sourceValue = source[key as keyof T];
    if (
      sourceValue != null &&
      typeof sourceValue === "object" &&
      !Array.isArray(sourceValue)
    ) {
      (result as Record<string, unknown>)[key] = merge(
        ((result as Record<string, unknown>)[key] as T) || {},
        sourceValue as T
      );
    } else {
      (result as Record<string, unknown>)[key] = sourceValue;
    }
  });
  return result;
}

export function get<T extends Record<string, unknown>>(
  obj: T,
  path: string,
  defaultValue?: unknown
): unknown {
  const keys = path.split(".");
  let result: unknown = obj;

  for (const key of keys) {
    if (result == null || typeof result !== "object") {
      return defaultValue;
    }
    result = (result as Record<string, unknown>)[key];
  }

  return result !== undefined ? result : defaultValue;
}

export function set<T extends Record<string, unknown>>(
  obj: T,
  path: string,
  value: unknown
): T {
  const keys = path.split(".");
  const result = { ...obj };
  let current: Record<string, unknown> = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (
      !(key in current) ||
      current[key] == null ||
      typeof current[key] !== "object"
    ) {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }

  current[keys[keys.length - 1]] = value;
  return result;
}

export function has(obj: unknown, path: string): boolean {
  const keys = path.split(".");
  let current = obj;

  for (const key of keys) {
    if (current == null || typeof current !== "object" || !(key in current)) {
      return false;
    }
    current = (current as Record<string, unknown>)[key];
  }

  return true;
}

export function keys<T extends Record<string, unknown>>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export function values<T extends Record<string, unknown>>(obj: T): unknown[] {
  return Object.values(obj);
}

export function entries<T extends Record<string, unknown>>(
  obj: T
): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

export function mapKeys<T extends Record<string, unknown>, R extends string>(
  obj: T,
  fn: (key: keyof T, value: unknown) => R
): Record<R, unknown> {
  const result = {} as Record<R, unknown>;
  Object.entries(obj).forEach(([key, value]) => {
    result[fn(key as keyof T, value)] = value;
  });
  return result;
}

export function mapValues<T extends Record<string, unknown>, R>(
  obj: T,
  fn: (value: unknown, key: keyof T) => R
): Record<keyof T, R> {
  const result = {} as Record<keyof T, R>;
  Object.entries(obj).forEach(([key, value]) => {
    result[key as keyof T] = fn(value, key as keyof T);
  });
  return result;
}

export function invert(obj: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {};
  Object.entries(obj).forEach(([key, value]) => {
    result[value] = key;
  });
  return result;
}

export function defaults<T extends Record<string, unknown>>(
  obj: T,
  defaults: Partial<T>
): T {
  const result = { ...defaults, ...obj };
  return result;
}
