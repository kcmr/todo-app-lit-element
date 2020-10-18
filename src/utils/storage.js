export const storage = {
  get(key, defaultValue = null) {
    const value = localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }

    return defaultValue;
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};
