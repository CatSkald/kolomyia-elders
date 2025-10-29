const isBrowser = typeof window !== "undefined";

export const store = (key: string, value: string): void => {
  if (isBrowser) window.localStorage.setItem(key, value);
};

const arraySeparator = "\t";

export const storeArray = (key: string, value: string[]): void => {
  if (isBrowser) window.localStorage.setItem(key, value.join(arraySeparator));
};

export function retrieveArray(key: string): string[] | null {
  if (!isBrowser) return null;

  try {
    return window.localStorage.getItem(key)?.split(arraySeparator) ?? null;
  } catch {
    return null;
  }
}

export function retrieve(key: string): string | null {
  if (!isBrowser) return null;

  return window.localStorage.getItem(key);
}
