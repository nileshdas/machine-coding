export function multiply(a, b, c) {
  return a * b * c;
}

export function curry(fn) {
  if (typeof fn !== "function") {
    throw new TypeError("Expected a function to curry, but got " + typeof fn);
  }

  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...next) => curried(...args, ...next);
    }
  };
}

// const curriedFn = curry(multiply);

//   console.log(curriedFn(1)(2)(3));
