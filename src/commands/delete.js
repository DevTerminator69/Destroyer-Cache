module.exports = function deleteKey(cache, key) {
    if (typeof key !== 'string') {
      throw new Error("The 'key' must be a string.");
    }
  
    delete cache[key];
  };
  