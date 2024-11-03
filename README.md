Here's a README file with examples for your `Destroyer` cache. This README includes installation instructions, usage examples, and details about each command.

---

# Destroyer Cache

`Destroyer` is a high-performance, in-memory caching solution for Node.js, built to handle temporary data storage with lightning speed. It supports automatic expiration, numeric operations, and robust error handling, making it perfect for applications requiring quick and easy data access.

## Features

- **In-Memory Storage**: Store key-value pairs with optional expiration.
- **Automatic Expiration**: Remove expired items in the background without blocking operations.
- **Basic Arithmetic**: Perform `add`, `sub`, `mul`, and `div` operations directly on stored values.
- **Error Handling**: Input validation and robust error reporting for all operations.
- **Modular Design**: Separate modules for each operation, allowing extensibility and easy maintenance.

## Installation

To install `Destroyer` in your project, run:

```bash
npm install destroyer-fast-cache
```

## Getting Started

```javascript
const { Destroyer } = require('destroyercache');
const cache = new Destroyer();
```

### Basic Commands

#### Set a Value

Store a value with an optional expiration time.

```javascript
// Store a value permanently
cache.set("username", "john_doe");

// Store a value with an expiration (10 seconds)
cache.set("session_id", "abc123", { EX: 10 });
```

#### Get a Value

Retrieve a value by its key. If the item has expired, `get` will return `null`.

```javascript
console.log(cache.get("username")); // Output: john_doe
setTimeout(() => console.log(cache.get("session_id")), 11000); // Output: null (after 11 seconds)
```

#### Delete a Value

Remove a specific key from the cache.

```javascript
cache.delete("username");
console.log(cache.get("username")); // Output: null
```

#### Clear the Cache

Remove all items from the cache.

```javascript
cache.clear();
```

### Arithmetic Commands

Perform basic arithmetic on numeric values stored in the cache.

#### Add

Add a number to the stored value.

```javascript
cache.set("counter", 5);
cache.add("counter", 3);
console.log(cache.get("counter")); // Output: 8
```

#### Subtract

Subtract a number from the stored value.

```javascript
cache.sub("counter", 2);
console.log(cache.get("counter")); // Output: 6
```

#### Multiply

Multiply the stored value by a number.

```javascript
cache.mul("counter", 4);
console.log(cache.get("counter")); // Output: 24
```

#### Divide

Divide the stored value by a number.

```javascript
cache.div("counter", 3);
console.log(cache.get("counter")); // Output: 8
```

> **Note**: Trying to divide by zero will throw an error.

### Error Handling

`Destroyer` has built-in validation for all commands. Examples:

- **Invalid Key**: Passing a non-string key throws an error.
- **Undefined Value**: Passing `undefined` as a value will throw an error.
- **Invalid Arithmetic**: Attempting math operations on non-numeric values or dividing by zero throws an error.

```javascript
try {
  cache.set(123, "value"); // Error: The 'key' must be a string.
} catch (error) {
  console.error(error.message);
}

try {
  cache.div("nonexistent_key", 5); // Error: Value associated with 'nonexistent_key' must be a number.
} catch (error) {
  console.error(error.message);
}
```
