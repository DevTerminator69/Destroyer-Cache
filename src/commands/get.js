module.exports = function get(cache, key) {
    if (typeof key !== 'string') {
      throw new Error("The 'key' must be a string.");
    }
  
    const entry = cache[key];
    if (!entry) return null;
  
    const { value, expiresAt } = entry;
    if (expiresAt && Date.now() > expiresAt) {
      delete cache[key];
      return null;
    }
  
    return value;
  };
  