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
export const isVoid = (value: unknown) =>
  value === null || value === undefined || value === "";

export const cleanObiect = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };
  Object.keys(result).forEach((key: string) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useArray = <V>(value: [V]) => {
  const [persons, setPersons] = useState([...value]);
  const clear = () => setPersons([]);
  const removeIndex = (i: number) => {
    setPersons(persons.filter((item, index) => index !== i));
  };
  const add = (person: V) => setPersons([...persons, { ...person }]);
  return {
    clear,
    removeIndex,
    add,
  };
};
