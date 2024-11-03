const { MinPriorityQueue } = require('@datastructures-js/priority-queue');
const set = require('./commands/set');
const get = require('./commands/get');
const deleteKey = require('./commands/delete');
const add = require('./commands/add');
const sub = require('./commands/sub');
const mul = require('./commands/mul');
const div = require('./commands/div');

class Destroyer {
  constructor() {
    this.cache = Object.create(null);
    this.expirationQueue = new MinPriorityQueue((a, b) => a.expiresAt - b.expiresAt);
    setInterval(() => this.cleanUpExpiredItems(), 1000);
  }

  set(key, value, options) {
    try {
      set(this.cache, this.expirationQueue, key, value, options);
    } catch (error) {
      console.error(`Set error: ${error.message}`);
    }
  }

  get(key) {
    try {
      return get(this.cache, key);
    } catch (error) {
      console.error(`Get error: ${error.message}`);
      return null;
    }
  }

  delete(key) {
    try {
      deleteKey(this.cache, key);
    } catch (error) {
      console.error(`Delete error: ${error.message}`);
    }
  }

  add(key, amount) {
    try {
      add(this.cache, this.expirationQueue, key, amount);
    } catch (error) {
      console.error(`Add error: ${error.message}`);
    }
  }

  sub(key, amount) {
    try {
      sub(this.cache, this.expirationQueue, key, amount);
    } catch (error) {
      console.error(`Subtract error: ${error.message}`);
    }
  }

  mul(key, amount) {
    try {
      mul(this.cache, this.expirationQueue, key, amount);
    } catch (error) {
      console.error(`Multiply error: ${error.message}`);
    }
  }

  div(key, amount) {
    try {
      div(this.cache, this.expirationQueue, key, amount);
    } catch (error) {
      console.error(`Divide error: ${error.message}`);
    }
  }

  cleanUpExpiredItems() {
    try {
      const now = Date.now();
      while (!this.expirationQueue.isEmpty() && this.expirationQueue.front().expiresAt <= now) {
        const { key } = this.expirationQueue.dequeue();
        delete this.cache[key];
      }
    } catch (error) {
      console.error(`Cleanup error: ${error.message}`);
    }
  }

  clear() {
    this.cache = Object.create(null);
    this.expirationQueue.clear();
  }
}

module.exports = Destroyer;
