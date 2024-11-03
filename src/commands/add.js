const get = require('./get');
const set = require('./set');

module.exports = function add(cache, expirationQueue, key, amount) {
  if (typeof key !== 'string') {
    throw new Error("The 'key' must be a string.");
  }
  if (typeof amount !== 'number') {
    throw new Error("The 'amount' must be a number.");
  }

  const value = get(cache, key);
  if (typeof value !== 'number') {
    throw new Error(`The value associated with '${key}' must be a number.`);
  }

  set(cache, expirationQueue, key, value + amount);
};
