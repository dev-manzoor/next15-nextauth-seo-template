// Array utility functions

export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export function uniqueBy<T>(arr: T[], key: keyof T): T[] {
  const seen = new Set();
  return arr.filter((item) => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce(
    (groups, item) => {
      const group = String(item[key]);
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(item);
      return groups;
    },
    {} as Record<string, T[]>,
  );
}

export function sortBy<T>(
  arr: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc",
): T[] {
  return [...arr].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue < bValue) return order === "asc" ? -1 : 1;
    if (aValue > bValue) return order === "asc" ? 1 : -1;
    return 0;
  });
}

export function shuffle<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export function flatten<T>(arr: (T | T[])[]): T[] {
  return arr.reduce<T[]>((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter((item) => arr2.includes(item));
}

export function difference<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter((item) => !arr2.includes(item));
}

export function union<T>(...arrays: T[][]): T[] {
  return unique(flatten(arrays));
}

export function move<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
  const newArr = [...arr];
  const element = newArr.splice(fromIndex, 1)[0];
  newArr.splice(toIndex, 0, element);
  return newArr;
}

export function remove<T>(arr: T[], index: number): T[] {
  return arr.filter((_, i) => i !== index);
}

export function insert<T>(arr: T[], index: number, ...items: T[]): T[] {
  return [...arr.slice(0, index), ...items, ...arr.slice(index)];
}

export function findIndex<T>(
  arr: T[],
  predicate: (item: T, index: number) => boolean,
): number {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i)) return i;
  }
  return -1;
}

export function findLastIndex<T>(
  arr: T[],
  predicate: (item: T, index: number) => boolean,
): number {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i], i)) return i;
  }
  return -1;
}

export function sample<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

export function sampleSize<T>(arr: T[], size: number): T[] {
  if (size >= arr.length) return shuffle([...arr]);
  return shuffle([...arr]).slice(0, size);
}

export function range(start: number, end: number, step: number = 1): number[] {
  const result: number[] = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }
  return result;
}

export function zip<T, U>(arr1: T[], arr2: U[]): [T, U][] {
  const length = Math.min(arr1.length, arr2.length);
  const result: [T, U][] = [];
  for (let i = 0; i < length; i++) {
    result.push([arr1[i], arr2[i]]);
  }
  return result;
}

export function partition<T>(
  arr: T[],
  predicate: (item: T) => boolean,
): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];

  arr.forEach((item) => {
    if (predicate(item)) {
      pass.push(item);
    } else {
      fail.push(item);
    }
  });

  return [pass, fail];
}
