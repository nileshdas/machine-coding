// const arr = [1, [2, [3, [4]]]];

// console.log(arr.flat(1)); // [1, 2, [3, [4]]]
// console.log(arr.flat(2)); // [1, 2, 3, [4]]
// console.log(arr.flat(3)); // [1, 2, 3, 4]

if (!Array.prototype.flat) {
  Array.prototype.flat = function (depth = 1) {
    let res = [];

    function flatten(arr, d) {
      for (let item of arr) {
        if (Array.isArray(item) && d > 0) {
          flatten(item, d - 1);
        } else {
          res.push(item);
        }
      }
    }

    flatten(this, depth);
    return res;
  };
}
