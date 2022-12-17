import { BRAND_FILTERS, CATEGORY_FILTERS } from '../constants';

export const setLocalStorage = (name: string, value: string) => {
  localStorage.setItem(name, value);
};

export const getLocalStorage = (name: string) => {
  const savedData = localStorage.getItem(name);
  if (savedData) {
    if (name === CATEGORY_FILTERS || name === BRAND_FILTERS) {
      return JSON.parse(savedData)
    }
    return savedData;
  }
  return ""
};
