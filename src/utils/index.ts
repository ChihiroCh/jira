import { useEffect, useState } from "react";

export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
  }, []);
};

export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounce, setDebounce] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounce(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounce;
};

const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObiect = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key: string) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
