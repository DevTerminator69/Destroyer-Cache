module.exports = function set(cache, expirationQueue, key, value, options = {}) {
    if (typeof key !== 'string') {
      throw new Error("The 'key' must be a string.");
    }
    if (value === undefined) {
      throw new Error("The 'value' cannot be undefined.");
    }
  
    const ttl = options.EX;
    if (ttl !== undefined && (typeof ttl !== 'number' || ttl <= 0)) {
      throw new Error("The 'EX' option must be a positive number.");
    }
  
    const expiresAt = ttl ? Date.now() + ttl * 1000 : null;
    cache[key] = { value, expiresAt };
  
    if (expiresAt) {
      expirationQueue.enqueue({ key, expiresAt });
    }
  };
  